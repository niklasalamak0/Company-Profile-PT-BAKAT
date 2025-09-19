import { CheckCircle, Target, Eye, Heart } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  const keyPoints = [
    "Tim profesional bersertifikat dan berpengalaman",
    "Menggunakan material dan teknologi berkualitas tinggi",
    "Layanan maintenance dan garansi terpercaya",
    "Harga kompetitif dengan kualitas terjamin",
  ]

  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="grid lg:grid-cols-2 gap-12 items-center px-6 lg:px-12">
        {/* Left content */}
        <div className="space-y-8">
          {/* Mengganti container luar dengan padding horizontal */}
          <div className="px-4 sm:px-6 lg:px-8"> 

            {/* Section Box Tentang Kami */}
            <div className="relative">
              <div className="mb-6 z-10">
                <div className="w-full max-w-2xl border-2 border-orange-500 rounded-lg p-6 text-center bg-white shadow-md transition-all duration-300 hover:bg-orange-500 group">
                  <h2 className="text-2xl font-bold text-orange-500 md:text-3xl transition-colors duration-300 group-hover:text-white">
                    Tentang Kami
                  </h2>
                  <p className="mt-2 text-sm text-gray-700 md:text-base leading-relaxed transition-colors duration-300 group-hover:text-white">
                    Kami adalah perusahaan yang telah berpengalaman dalam memberikan
                    solusi terpadu di bidang periklanan dan mechanical electrical.
                  </p>
                </div>
              </div>
              
              {/* Gambar Hero Content */}
              <div className="relative w-full max-w-2xl">
                <Image
                  src="/hero-content.jpg"
                  alt="Tentang PT. Bakti Karya Teknik"
                  width={800}
                  height={500}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Konten Lanjutan */}
            <div className="space-y-4 mt-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                Menghadirkan Solusi Terbaik untuk Bisnis Anda
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-pretty">
                PT. Bakti Karya Teknik adalah perusahaan yang telah berpengalaman lebih dari 3 tahun
                dalam memberikan solusi terpadu di bidang periklanan dan building mechanical electrical.
                Kami berkomitmen untuk memberikan layanan berkualitas tinggi dengan teknologi terdepan
                dan tim profesional yang berpengalaman.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="grid gap-6">
          {/* Misi Kami */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Target className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Misi Kami</h3>
                <ul className="space-y-3 text-gray-600 list-decimal list-inside">
                  <li>Mengutamakan kecepatan dalam merespons permintaan klien, sehingga masalah perawatan segera ditangani dan pemasangan dapat selesai tepat waktu.</li>
                  <li>Memberikan pelayanan perawatan bangunan yang profesional dan berkualitas tinggi, sehingga klien merasa puas dengan hasil kerja kami.</li>
                  <li>Menyediakan layanan pemasangan (instalasi) sistem listrik, AC, renovasi bangunan, advertising, dan CCTV baru yang inovatif dan handal untuk memenuhi kebutuhan klien.</li>
                  <li>Menjamin kualitas hasil kerja dengan menggunakan peralatan dan material terbaik, serta didukung oleh tenaga kerja yang terampil dan berpengalaman.</li>
                  <li>Terus berinovasi dan mengembangkan layanan perusahaan untuk menjawab tuntutan pasar yang selalu berubah dan meningkatkan kepuasan pelanggan.</li>
                  <li>Menjalankan bisnis dengan etika dan integritas yang tinggi, menjaga hubungan yang baik dengan pelanggan, mitra, dan masyarakat untuk menciptakan kepercayaan jangka panjang.</li>
                  <li>Berkomitmen untuk berkontribusi dalam upaya pelestarian lingkungan dengan menerapkan praktik bisnis yang ramah lingkungan dan berkelanjutan.</li>
                  <li>Mendorong pengembangan karyawan dan menciptakan lingkungan kerja yang inspiratif, inklusif, dan memberikan kesempatan untuk berkembang secara profesional.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visi Kami */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visi Kami</h3>
                <p className="text-gray-600">
                  Menjadi perusahaan terkemuka di bidang perawatan bangunan dan instalasi sistem
                  (listrik, AC, bangunan, advertising, CCTV) dengan layanan unggulan "fast response"
                  dan kualitas yang terjamin.
                </p>
              </div>
            </div>
          </div>

          {/* Komitmen Kami */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Heart className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Komitmen Kami</h3>
                <p className="text-gray-600">
                  Visi dan misi di atas mencerminkan komitmen PT Bakti Karya Teknik dalam
                  memberikan layanan perawatan dan pemasangan berkualitas tinggi dengan fokus
                  pada kecepatan dan kualitas yang dijamin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
