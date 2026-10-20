// =========================================================================
//  src/config/content.ts
//  Kustomisasi total untuk website confession.
//  Ubah data di bawah ini sesuai kebutuhanmu!
// =========================================================================

export const config = {
  // ── 1. IDENTITAS UTAMA ──────────────────────────────────────────────────
  recipientName: "anin", // Nama crush kamu
  senderName: "afif", // Namamu / panggilanmu

  // ── 2. MUSIK BACKGROUND OTOMATIS (AUTOPLAY SAAT TOMBOL "BUKA" DITEKAN) ───
  // Lagu: Beautiful - Bazzi (feat. Camila Cabello)
  music: {
    // File audio lagu berada di: /public/audio/music.mp3
    src: "/audio/music.mp3",
    title: "Beautiful - Bazzi (feat. Camila Cabello)",
  },

  // ── 3. PAGE 1: COVER ────────────────────────────────────────────────────
  page1: {
    line1: "a special letter",
    line2: "just for you, anin.",
    buttonText: "buka",
    hintText: "tap buat lanjut yaa ^^",
  },

  // ── 4. PAGE 2: KENANGAN POLAROID ─────────────────────────────────────────
  page2: {
    title: "our memories",
    subtitle: "a collection of moments with anin ❤︎",
    // Masukkan foto ke folder: /public/photos/ (misal: photo1.jpg)
    // Jika array ini kosong [], akan otomatis menampilkan placeholder estetik
    photos: [
      {
        src: "/photos/photo3.jpg",
        caption: "kamu di belakang, tapi senyumnya tetap keliatan",
      },
      {
        src: "/photos/photo4.jpg",
        caption: "just us, being us 📸",
      },
      {
        src: "/photos/photo5.jpg",
        caption: "kamu, dan segala bahagianya",
      },
      {
        src: "/photos/photo2.jpg",
        caption: "tangan yang ini, aku mau terus genggam",
      },
      {
        src: "/photos/photo1.jpg",
        caption: "my gorgeous anin <3",
      },
    ],
    buttonText: "baca surat",
  },

  // ── 5. PAGE 3: SURAT PANJANG ────────────────────────────────────────────
  page3: {
    headerTag: "SEALED WITH LOVE",
    title: "open when you're ready",
    paragraphs: [
      "hii aninn, jujur aku gatauu harus mulai dari mana, but there's something i've been wanting to tell you for a while.. selama kita kenal dan menghabiskan waktu bareng, aku mulai ngerasa kalo kamu jadi seseorang yang punya tempat tersendiri buat aku aninn, i enjoy every little moment with you, mulai dari obrolan random kita, jalan barengg, cerita tentang hari masing-masing, sampai ke hal yang sesederhana itu dan mungkin keliatannya biasa aja, but somehow they mean a lot to me.",
      "aku masih inget tauu waktu kita main kartu di sudutt, padahal awalnya cuma nongkrong biasa, main kartu, ketawa bareng, saling ngeledekin waktu ada yang kalah, but somehow, di tengah semua itu, aku malah lebih sering merhatiin kamu daripada kartu yang ada di tanganku sendiri aninn, aku inget berawal dari aku make sure ke dzaky, eh sampe seintens sekarangg, it became something i'll remember. aku gatau persis kapan perasaan aku mulai muncul, tapi kalau ditanya kapan aku mulai sadar kalau aku suka sama kamu, jawabanku waktu kita main kartu pas di sudut hehe, aku sadar kalo ternyata aku seneng banget bisa ada di dekat kamu aninn, dan tanpa aku sadar, perhatian aku selalu balik lagi ke kamu.",
      "the more i get to know you, the more i realize that there's so much about you that i genuinely like, bukan cuma karena aku seneng menghabiskan waktu sama kamu anin, tapi juga karena aku suka cara kamu melihat sesuatu, cara anin cerita, dan bagaimana kamu tetap jadi diri kamu sendiri aninn, i want to know more about you, about the things that make you happy, the things that worry you, and even the little things you might think aren't worth telling anyone, aku pengen bisa jadi seseorang yang bisa anin ajak cerita, seseorang yang ikut seneng waktu anin bahagia, dan seseorang yang bisa anin andelin di hari-hari yang ga berjalan sesuai harapan.",
      "aku juga sadar kalo hubungan bukan cuma tentang perasaan seneng di awal, there will be alot of things we need to learn, moments when we don't understand each other, and days when things might not go as we planned, semua prosesnya gaakan selalu mudah, because i know that's not how life works kan? but if you give me the chance aninn, i'd like to learn and grow with you, aku mau kita bisa saling memahami, saling support, dan sama-sama berusaha menjaga apa yang kita punya, aku ga berharap kita harus selalu sempurna, aku cuma berharap kita bisa saling jujur dan tetap milih untuk berusaha bareng kalo ada hal-hal yang perlu diperbaiki.",
      "so, anin, i think i've fallen for you.. at some point, kamu bukan lagi sekedar seseorang yang aku senengin buat diajak jalan atau ngobrol, but someone i'd genuinely like to have in my life as more than a friend, aku gatau apa yang ada di pikiran kamu sekarang aninn, dan aku gamau berasumsi kalau perasaan kita pasti sama, that's why i want to ask you this, properly and sincerely, because i want you to know how i feel about you.",
      "jawab dari dalam hati kamu yaa aninn, take your time, and be honest with yourself yaa, aku pengen jawaban anin datang dari apa yang bener-bener anin rasain, bukan karena anin merasa harus menjawab dengan cara tertentu, whatever your answer is, i hope it's the one that feels right for you, but if you feel the same way and you're willing to give us a chance, i'd be really happy to start this new chapter with you aninn ❤︎",
    ],
    closing: "with love,",
    scrollHint: "scroll ke bawah yaa ^^",
    buttonText: "ada satu pertanyaan",
  },

  // ── 6. PAGE 4: PERTANYAAN (YES/NO ESCAPE BUTTON) ─────────────────────────
  page4: {
    questionText: "will you be my girlfriend?",
    subText: "answer from your heart yaa anin :)",
    yesButtonText: "Yes",
    noButtonText: "No",
    footerHint: "pilih salah satu jawaban di atas yaa ^^",
    // Kalimat jenaka yang berganti-ganti saat tombol No menghindar
    noEscapePhrases: [
      "kok kabur sih...",
      "coba lagi deh >.<",
      "tombolnya malu ya hehe",
      "yakin mau pencet yang ini?",
      "tap tombol yes yukk",
      "jangan jahat dong hehe",
      "eits, ga kenaaa",
    ],
    // Maksimum pembesaran skala tombol Yes (misal: 1.8x ukuran normal)
    yesMaxScale: 1.6,
  },

  // ── 7. PAGE 5: RESMI JADIAN (CERTIFICATE OF BEING TOGETHER) ──────────────
  page5: {
    certificate: {
      headerTag: "OFFICIALLY YOURS",
      title: "Certificate of Being Together",
      subtitle: "officially hari jadi kita, mulai hari ini dan seterusnya.",
      // Tanggal diresmikan
      dateOverride: "21 Oktober 2026",
      promiseTitle: "A LITTLE PROMISE FOR US",
      promises: [
        "i can't promise that every day will be perfect, but i promise to keep trying, to keep understanding you, and to keep choosing us.",
        "aku pengen kita jadi tempat pulang satu sama lain. tempat buat cerita tentang hari yang menyenangkan, ngeluh tentang hari yang melelahkan, dan berbagi hal-hal kecil that mean everything to us.",
        "let's grow together, learn together, and make more beautiful memories along the way.",
      ],
      rules: [],
      stampText: "APPROVED",
    },
    tapHint: "✨ tap sertifikatnya buat ngerayain kita!",
    closingNote:
      "semoga kedepannya kita punya lebih banyak cerita, lebih banyak tawa, dan lebih banyak alasan buat tetap saling memilih, ga harus selalu sempurna, yang penting kita harus sama-sama mau berusaha 🤍",
    screenshotHint:
      "screenshot halaman ini yaa, biar kita punya bukti kalo hari ini resmi jadi hari kita.",
    restartButtonText: "ulangi dari awal ↺",
    whatsapp: {
      enabled: true,
      number: "6283878367514", // Ganti dengan nomor WhatsApp kamu (format: 628...)
      message: "",
      buttonText: "KABARIN AKU DI WHATSAPP",
    },
  },
};
