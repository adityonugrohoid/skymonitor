# Berkontribusi / Contributing

Bahasa Indonesia dulu, English below. Issue, pull request dan pesan commit
boleh ditulis dalam Bahasa Indonesia atau bahasa Inggris. Kode, nama
variabel dan komentar di dalam kode tetap dalam bahasa Inggris.

## Aturan kata

Berlaku untuk setiap teks yang ditulis proyek ini: isi halaman, teks kartu,
keterangan berkas data, README, pesan commit. Aturan ini bukan soal gaya.
Aturan ini yang menjaga situs tetap di luar definisi hukum "peringatan dini"
(UU 24/2007) dan tetap di dalam tindakan yang dilindungi, yaitu membantu
menyebarluaskan informasi resmi (UU 31/2009 Pasal 89, PP 11/2016 Pasal 49).

1. Setiap kalimat adalah salah satu dari tiga jenis: fakta bersumber dengan
   waktunya, kutipan utuh pernyataan resmi dengan nama lembaga dan waktunya,
   atau perbandingan model yang disebut namanya.
2. Tidak ada kalimat perintah buatan proyek. Teks anjuran hanya berasal dari
   Permen LHK P.14/2020 Lampiran II atau pernyataan resmi BMKG atau KLHK,
   dikutip dengan sumbernya.
3. Kata "peringatan", "siaga", "waspada", "darurat" dan "status" tidak muncul
   dalam teks buatan proyek maupun dalam nama proyek.
4. Notifikasi, bila suatu saat ada, disebut "pembaruan" dan hanya memuat
   fakta atau kutipan utuh pernyataan resmi.
5. Setiap halaman memuat satu baris "sumber resmi" yang menautkan BMKG,
   ISPUnet (KLHK) dan SiPongi (KLHK).

PM2.5 hasil model ditampilkan sebagai angka dengan keterangan "perkiraan
model sekitar 40 km, bukan pengukuran", memakai skala warna netral milik
proyek, dengan skala ISPU resmi dicetak di sampingnya sebagai rujukan.
Proyek mencetak skalanya; proyek tidak pernah menetapkan kategorinya. Warna
ISPU hanya muncul pada bacaan resmi KLHK.

Tampilan titik panas dibatasi sekitar 30-50 km dan diberi label "arah angin
saat ini", tidak pernah "sumber asap". Nama perusahaan, konsesi atau pemilik
lahan perorangan tidak pernah disebut.

## Tanpa data pribadi

Situs tidak mengumpulkan apa pun: tanpa akun, tanpa cookie, tanpa analitik,
tanpa pencatatan pengunjung di sisi server di luar yang disimpan Cloudflare
secara bawaan. Geolokasi, bila dipakai, tetap di peramban. Pull request
tidak boleh menambahkan salah satu dari itu.

Tidak ada bagian repo yang boleh memuat nama orang, lokasi rumah, nomor
telepon atau keterangan kesehatan, termasuk di fixtures, tangkapan layar dan
data uji. Koordinat TPA dan stasiun adalah fasilitas publik dan boleh.

## Tanpa kunci di repo

Kunci API hulu disimpan di GitHub Actions secrets dan di berkas kunci lokal
pengelola. Skrip membacanya; berkas tidak pernah memuatnya. Kunci di berkas
yang terlacak git adalah temuan review yang memblokir, dan kuncinya diganti.

## Teks

Tanda baca ASCII saja dalam prosa: tanda hubung, tanda kutip lurus, tiga
titik. Tanpa em-dash, tanda kutip keriting, panah atau simbol hias. Bahasa
Indonesia dulu, bahasa Inggris kedua. Waktu selalu membawa zonanya (WIB,
WITA, WIT) dan diambil dari waktu data hulu, bukan waktu render.

## Pull request

- Satu PR, satu maksud. Judul menyebutkan perubahannya.
- Hanya berkas yang disentuh perubahan itu yang di-stage.
- Pengujian berjalan terhadap `fixtures/`, tidak pernah terhadap jaringan.
- Daftar periksa di templat PR dijawab dengan jujur; "belum diverifikasi"
  adalah jawaban yang boleh, "sudah diverifikasi" yang palsu tidak.

---

## English

Issues, pull requests and commit messages may be written in Bahasa Indonesia
or English. Code, identifiers and comments inside code stay in English.

### Wording rules

These apply to every string the project authors: page copy, card text, file
descriptions, README, commit messages. They keep the site outside the legal
definition of a warning (UU 24/2007) and inside the protected act of helping
disseminate official information (UU 31/2009 Pasal 89, PP 11/2016 Pasal 49).

1. Every statement is one of three kinds: a sourced fact with a time, a
   verbatim relay of an official statement with agency and time, or a
   comparison of named models.
2. No imperative sentences of the project's own. Advice text comes only from
   Permen LHK P.14/2020 Lampiran II or an official BMKG or KLHK statement,
   quoted with attribution.
3. The words "peringatan", "siaga", "waspada", "darurat" and "status" do not
   appear in project-authored text or in the project name.
4. Any notification, if ever added, is called "pembaruan" and carries only
   facts or verbatim official statements.
5. Every page carries a one-line "sumber resmi" strip linking BMKG, ISPUnet
   (KLHK) and SiPongi (KLHK).

Model PM2.5 is shown as a number with "perkiraan model sekitar 40 km, bukan
pengukuran", on its own neutral colour ramp, with the official ISPU scale
printed beside it as a reference table. The project prints the scale; it
never assigns the category. ISPU colours appear only on official KLHK
readings.

The hotspot view is limited to about 30-50 km and labelled "arah angin saat
ini", never "sumber asap". No company, concession or private landowner is
ever named.

### No personal data

The site collects nothing: no accounts, no cookies, no analytics, no
server-side logging of visitors beyond what Cloudflare keeps by default. Any
geolocation stays in the browser. Pull requests must not add any of these.

Nothing in the repo may contain a person's name, home location, phone number
or health detail, including in fixtures, screenshots and test data. Landfill
and station coordinates are public facilities and are fine.

### No keys in the repo

Upstream keys live in GitHub Actions secrets and in the maintainer's local
key file. Scripts read them; files never contain them. A key in a tracked
file is a blocking review finding, and the key is rotated.

### Text

ASCII punctuation only in prose: hyphen, straight quotes, three dots. No
em-dashes, curly quotes, arrows or decorative symbols. Bahasa Indonesia
first, English second. Times carry their zone (WIB, WITA, WIT) and come from
the upstream data time, never the render time.

### Pull requests

- One PR, one intent. The title describes the change.
- Stage only files the change touched.
- Tests run against `fixtures/`, never against the network.
- The PR template's checklist must be answered honestly; "not verified" is
  an acceptable answer, a false "verified" is not.
