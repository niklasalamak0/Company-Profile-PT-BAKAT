"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Download, Search, Filter, Trash2, AlertTriangle } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  service_type: "advertising" | "building_me"
  message: string
  created_at: string
}

interface ContactsManagerProps {
  onDataChange: () => void
  isDatabaseReady: boolean
}

export function ContactsManager({ onDataChange, isDatabaseReady }: ContactsManagerProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState<"all" | "advertising" | "building_me">("all")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isDatabaseReady) {
      loadContacts()
    } else {
      setIsLoading(false)
    }
  }, [isDatabaseReady])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, serviceFilter])

    const loadContacts = async () => {
      if (!isDatabaseReady) {
        setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
        setIsLoading(false)
        return
      }
      try {
        setError(null)
        const res = await fetch('/api/contacts', { cache: 'no-store' })
        const ct = res.headers.get('content-type') || ''

        if (!ct.includes('application/json')) {
          const text = await res.text()
          console.error('[v0] /api/contacts non-JSON response:', res.status, text.slice(0, 300))
          setError(
            res.status === 404
              ? 'Route /api/contacts tidak ditemukan. Pastikan file /app/api/contacts/route.ts ada.'
              : 'API mengembalikan HTML (mungkin redirect login/middleware). Cek middleware & server log.'
          )
          return
        }

        const json = await res.json()
        if (!res.ok) {
          const msg = String(json?.error || '')
          if (msg.includes('schema') || msg.includes('exist')) {
            setError('Tabel contacts belum dibuat/terindeks. Jalankan migrasi & reload schema Supabase.')
          } else {
            setError('Gagal memuat data kontak.')
          }
          return
        }

        setContacts(json.data || [])
      } catch (e) {
        console.error('[v0] Error loading contacts:', e)
        setError('Gagal memuat data kontak.')
      } finally {
        setIsLoading(false)
      }
    }


  const filterContacts = () => {
    let filtered = contacts
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company || "").toLowerCase().includes(q),
      )
    }
    if (serviceFilter !== "all") {
      filtered = filtered.filter((c) => c.service_type === serviceFilter)
    }
    setFilteredContacts(filtered)
  }

  const deleteContact = async (id: string) => {
    if (!isDatabaseReady) {
      alert("Database belum siap")
      return
    }
    if (!confirm("Apakah Anda yakin ingin menghapus kontak ini?")) return
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Delete failed")
      await loadContacts()
      onDataChange()
    } catch (e) {
      console.error("[v0] Error deleting contact:", e)
      alert("Gagal menghapus kontak")
    }
  }

  const exportContacts = () => {
    const csvContent = [
      ["Nama", "Email", "Telepon", "Perusahaan", "Jenis Layanan", "Pesan", "Tanggal"],
      ...filteredContacts.map((c) => [
        c.name,
        c.email,
        c.phone,
        c.company ?? "-",
        c.service_type === "advertising" ? "Periklanan" : "Building ME",
        c.message.replace(/\r?\n/g, " "),
        new Date(c.created_at).toLocaleDateString("id-ID"),
      ]),
    ]
      .map((row) => row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isDatabaseReady) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Database belum siap. Jalankan script database terlebih dahulu untuk melihat data kontak.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading contacts...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
              <div className="mt-2 space-x-2">
                <Button onClick={loadContacts} size="sm">Coba Lagi</Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manajemen Kontak ({filteredContacts.length})</CardTitle>
          <Button onClick={exportContacts} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari nama, email, atau perusahaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={serviceFilter} onValueChange={(v: "all" | "advertising" | "building_me") => setServiceFilter(v)}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter layanan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Layanan</SelectItem>
              <SelectItem value="advertising">Periklanan</SelectItem>
              <SelectItem value="building_me">Building ME</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.company || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={c.service_type === "advertising" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}
                    >
                      {c.service_type === "advertising" ? "Periklanan" : "Building ME"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(c.created_at).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedContact(c)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail Kontak</DialogTitle>
                          </DialogHeader>
                          {selectedContact && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium text-gray-500">Nama</label><p>{selectedContact.name}</p></div>
                                <div><label className="text-sm font-medium text-gray-500">Email</label><p>{selectedContact.email}</p></div>
                                <div><label className="text-sm font-medium text-gray-500">Telepon</label><p>{selectedContact.phone}</p></div>
                                <div><label className="text-sm font-medium text-gray-500">Perusahaan</label><p>{selectedContact.company || "-"}</p></div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Jenis Layanan</label>
                                <p>{selectedContact.service_type === "advertising" ? "Periklanan" : "Building ME"}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Pesan</label>
                                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Tanggal</label>
                                <p>{new Date(selectedContact.created_at).toLocaleString("id-ID")}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => deleteContact(c.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            {searchTerm || serviceFilter !== "all" ? "Tidak ada kontak yang sesuai filter" : "Belum ada kontak"}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
