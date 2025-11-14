const categories = [
  "All Articles",
  "Eye Health",
  "Technology",
  "Tips & Advice",
  "Pediatric Care",
  "Prevention",
  "Style Guide",
];

const featuredArticle = {
  id: 1,
  category: "Eye Health",
  title: "The Importance of Regular Eye Exams: What You Need to Know",
  subtitle:
    "Many people underestimate the importance of regular eye examinations. Beyond just checking if you need new glasses, comprehensive eye exams can detect serious health conditions early, potentially saving your vision and even your life.",
  author: "Dr. Sarah Mitchell",
  date: "October 20, 2025",
  readTime: "5 min read",
  image: "https://api.builder.io/api/v1/image/assets/TEMP/3f7a350996b10d6c567b9448c9c0f0962e3d8d0c?width=652",
};

const recentArticles = [
  {
    id: 2,
    category: "Technology",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 3,
    category: "Technology",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 4,
    category: "Tips & Advice",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 5,
    category: "Eye Health",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 6,
    category: "Eye Health",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 7,
    category: "Eye Health",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
];

const article = {
  id: 1,
  category: "Eye Health",
  title: "Advancements in Eye Care Technology",
  subtitle:
    "Explore the latest innovations in eye care that are transforming how we diagnose and treat vision problems.",
  author: "Dr. Emily Johnson",
  authorBio:
    "Dr. Emily Johnson is a board-certified ophthalmologist with over 15 years of experience in eye care and vision correction.",
  date: "September 10, 2025",
  readTime: "7 min read",
  image:
    "https://api.builder.io/api/v1/image/assets/TEMP/3d6f0f4f4e1b4c3b9f8e4c8e2a1b2c3d4e5f6a7b?width=800",
  content: `
      <h2 className="text-[#101828] font-inter text-xl leading-6">
        Why Regular Eye Exams Matter
      </h2>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        Your eyes are windows not only to your soul, but also to your overall health.
        Regular comprehensive eye examinations are one of the most important preventive
        health measures you can take. Many serious eye conditions and systemic diseases
        develop without noticeable symptoms in their early stages, making routine eye exams
        crucial for early detection and treatment.
      </p>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        During a comprehensive eye exam, your eye doctor does much more than determine
        whether you need glasses or contacts. They examine the health of your eyes, screen
        for eye diseases, and can even detect signs of serious health conditions like
        diabetes, high blood pressure, and high cholesterol.
      </p>

      <h2 className="text-[#101828] font-inter text-xl leading-6">
        What Happens During a Comprehensive Eye Exam
      </h2>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        A thorough eye examination typically includes several tests and procedures:
      </p>

      <ul className="flex flex-col gap-3 pl-[50px]">
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Visual acuity test to measure the sharpness of your vision
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Refraction assessment to determine your exact prescription
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Eye pressure measurement to screen for glaucoma
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Dilated eye exam to check for diseases affecting the retina and optic nerve
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Visual field test to check your peripheral vision
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Color vision testing to detect color blindness
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Eye coordination and movement tests
          </span>
        </li>
      </ul>

      <h2 className="text-[#101828] font-inter text-xl leading-6">
        Early Detection of Eye Diseases
      </h2>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        Many eye diseases progress slowly and without symptoms until significant damage has
        occurred. Regular eye exams allow for early detection of conditions such as:
      </p>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        Glaucoma is often called the 'silent thief of sight' because it typically causes no
        pain and no early symptoms. By the time you notice vision loss, significant and
        permanent damage has already occurred. Regular eye exams with pressure testing and
        optic nerve evaluation can detect glaucoma in its earliest stages when treatment can
        be most effective.
      </p>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        Macular degeneration, cataracts, and diabetic retinopathy are other serious
        conditions that can be detected early through regular eye examinations, potentially
        preventing vision loss or blindness.
      </p>

      <h2 className="text-[#101828] font-inter text-xl leading-6">
        How Often Should You Get Your Eyes Examined?
      </h2>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        The American Optometric Association recommends different exam frequencies based on
        age and risk factors:
      </p>

      <ul className="flex flex-col gap-3 pl-[50px]">
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0 mt-2.5" />
          <span className="text-[#4A5565] font-inter text-base leading-6 flex-1">
            Children: First exam at 6 months, then at age 3, before starting school, and
            annually thereafter
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Adults 18-64: Every two years, or annually if wearing contacts or glasses
          </span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0" />
          <span className="text-[#4A5565] font-inter text-base leading-6">
            Adults 65+: Annually due to increased risk of eye diseases
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1F2B6C] flex-shrink-0 mt-2.5" />
          <span className="text-[#4A5565] font-inter text-base leading-6 flex-1">
            People with diabetes or family history of eye disease: Annually or as
            recommended by your eye doctor
          </span>
        </li>
      </ul>

      <h2 className="text-[#101828] font-inter text-xl leading-6">
        Don't Wait for Symptoms
      </h2>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        One of the biggest mistakes people make is waiting until they notice vision problems
        before scheduling an eye exam. By then, some conditions may have already caused
        irreversible damage. Regular preventive eye exams are your best defense against
        vision loss and eye disease.
      </p>
      <p className="text-[#4A5565] font-inter text-base leading-[26px]">
        Take charge of your eye health today by scheduling your comprehensive eye
        examination. Your future self will thank you for taking this important step in
        protecting your vision and overall health.
      </p>
    `
};

const relatedArticles = [
  {
    id: 2,
    category: "Technology",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 3,
    category: "Eye Health",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
  {
    id: 4,
    category: "Technology",
    title: "New Technology in LASIK Surgery",
    subtitle:
      "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
    author: "Dr. Michael Chen",
    date: "October 15, 2025",
    readTime: "4 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/14cbe71cbdf594bf9ee6f115e5d7509412592b13?width=661",
  },
];


export { categories, featuredArticle, recentArticles, article, relatedArticles };