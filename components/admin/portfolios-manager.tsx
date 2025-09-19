"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, AlertTriangle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { ImageUpload } from "./image-upload"

type Category = "advertising" | "building_me"

interface Portfolio {
  id: string
  title: string
  description: string
  category: Category
  client_name: string
  project_date: string // ISO date (yyyy-mm-dd)
  location: string
  image_url: string
  gallery_urls: string[]        // text[]
  technologies: string[]        // text[]
  project_value: number | null  // numeric
  duration_months: number | null// int4
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

interface PortfoliosManagerProps {
  onDataChange: () => void
  isDatabaseReady: boolean
}

export function PortfoliosManager({ onDataChange, isDatabaseReady }: PortfoliosManagerProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // form state selaras dengan kolom tabel
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "advertising" as Category,
    client_name: "",
    project_date: "",
    location: "",
    image_url: "",
    gallery_urls: [] as string[],
    technologies: [] as string[],
    project_value: null as number | null,
    duration_months: null as number | null,
    is_featured: false,
    is_published: false,
    sort_order: 0,
  })

  useEffect(() => {
    if (isDatabaseReady) {
      loadPortfolios()
    } else {
      setIsLoading(false)
    }
  }, [isDatabaseReady])

  const loadPortfolios = async () => {
    if (!isDatabaseReady) {
      setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
      setIsLoading(false)
      return
    }

    try {
      setError(null)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("sort_order", { ascending: true })

      if (error) {
        if (error.message.includes("does not exist")) {
          setError("Tabel portfolios belum dibuat. Silakan jalankan script database.")
        } else {
          throw error
        }
        return
      }
      setPortfolios((data as Portfolio[]) || [])
    } catch (err) {
      console.error("Error loading portfolios:", err)
      setError("Gagal memuat data portofolio.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "advertising",
      client_name: "",
      project_date: "",
      location: "",
      image_url: "",
      gallery_urls: [],
      technologies: [],
      project_value: null,
      duration_months: null,
      is_featured: false,
      is_published: false,
      sort_order: 0,
    })
    setEditingPortfolio(null)
  }

  const handleEdit = (p: Portfolio) => {
    setEditingPortfolio(p)
    setFormData({
      title: p.title,
      description: p.description || "",
      category: p.category,
      client_name: p.client_name,
      project_date: p.project_date,
      location: p.location || "",
      image_url: p.image_url,
      gallery_urls: Array.isArray(p.gallery_urls) ? p.gallery_urls : [],
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      project_value: p.project_value ?? null,
      duration_months: p.duration_months ?? null,
      is_featured: p.is_featured,
      is_published: p.is_published,
      sort_order: p.sort_order ?? 0,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isDatabaseReady) {
      alert("Database belum siap")
      return
    }

    try {
      const supabase = createClient()
      const portfolioData = {
        ...formData,
        // pastikan angka & array rapi sebelum kirim
        project_value: typeof formData.project_value === "number" ? formData.project_value : null,
        duration_months: typeof formData.duration_months === "number" ? formData.duration_months : null,
        gallery_urls: (formData.gallery_urls || []).filter(Boolean),
        technologies: (formData.technologies || []).filter(Boolean),
        updated_at: new Date().toISOString(),
      }

      if (editingPortfolio) {
        const { error } = await supabase.from("portfolios").update(portfolioData).eq("id", editingPortfolio.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("portfolios").insert(portfolioData)
        if (error) throw error
      }

      await loadPortfolios()
      onDataChange()
      setIsDialogOpen(false)
      resetForm()
    } catch (err) {
      console.error("Error saving portfolio:", err)
      alert("Gagal menyimpan portofolio")
    }
  }

  const deletePortfolio = async (id: string) => {
    if (!isDatabaseReady) {
      alert("Database belum siap")
      return
    }
    if (!confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("portfolios").delete().eq("id", id)
      if (error) throw error
      await loadPortfolios()
      onDataChange()
    } catch (err) {
      console.error("Error deleting portfolio:", err)
      alert("Gagal menghapus portofolio")
    }
  }

  const parseArrayInput = (value: string) =>
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

  if (!isDatabaseReady) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Database belum siap. Silakan jalankan script database terlebih dahulu untuk mengelola portofolio.
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
          <div className="text-center">Loading portfolios...</div>
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
              <Button onClick={loadPortfolios} className="ml-4" size="sm">
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manajemen Portofolio ({portfolios.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Portofolio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPortfolio ? "Edit Portofolio" : "Tambah Portofolio Baru"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Baris 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Proyek</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advertising">Periklanan</SelectItem>
                        <SelectItem value="building_me">Building ME</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Deskripsi */}
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Baris 2 */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Nama Klien</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project_date">Tanggal Proyek</Label>
                    <Input
                      id="project_date"
                      type="date"
                      value={formData.project_date}
                      onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Gambar utama */}
                <ImageUpload
                  label="Gambar Utama"
                  value={formData.image_url}
                  onChange={(value) => setFormData({ ...formData, image_url: value })}
                />

                {/* Array input (koma) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallery_urls">Gallery URLs (pisahkan dengan koma)</Label>
                    <Input
                      id="gallery_urls"
                      placeholder="https://... , https://..."
                      value={(formData.gallery_urls || []).join(", ")}
                      onChange={(e) =>
                        setFormData({ ...formData, gallery_urls: parseArrayInput(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technologies">Teknologi (pisahkan dengan koma)</Label>
                    <Input
                      id="technologies"
                      placeholder="Next.js, Tailwind, Supabase"
                      value={(formData.technologies || []).join(", ")}
                      onChange={(e) =>
                        setFormData({ ...formData, technologies: parseArrayInput(e.target.value) })
                      }
                    />
                  </div>
                </div>

                {/* Angka & flag */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project_value">Nilai Proyek (angka)</Label>
                    <Input
                      id="project_value"
                      type="number"
                      step="0.01"
                      value={formData.project_value ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          project_value: e.target.value === "" ? null : Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_months">Durasi (bulan)</Label>
                    <Input
                      id="duration_months"
                      type="number"
                      value={formData.duration_months ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration_months: e.target.value === "" ? null : Number.parseInt(e.target.value, 10),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sort_order: Number.isNaN(+e.target.value) ? 0 : parseInt(e.target.value, 10),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Klien</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolios.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.client_name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        p.category === "advertising"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {p.category === "advertising" ? "Periklanan" : "Building ME"}
                    </Badge>
                  </TableCell>
                  <TableCell>{p.location || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={p.is_featured ? "default" : "secondary"}>
                      {p.is_featured ? "Ya" : "Tidak"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.is_published ? "default" : "secondary"}>
                      {p.is_published ? "Ya" : "Tidak"}
                    </Badge>
                  </TableCell>
                  <TableCell>{p.project_value ?? "-"}</TableCell>
                  <TableCell>{new Date(p.project_date).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePortfolio(p.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {portfolios.length === 0 && (
          <div className="text-center py-8 text-gray-500">Belum ada portofolio</div>
        )}
      </CardContent>
    </Card>
  )
}
