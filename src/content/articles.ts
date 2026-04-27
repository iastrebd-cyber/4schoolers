// All article content lives here. Imported as Vite assets so images get
// hashed URLs and lazy-loading. No requests go to 4schoolers.com at runtime.

import emotionalIntelligenceCover from "@/assets/articles/emotional-intelligence/cover.jpg";
import learnSoMuchCover from "@/assets/articles/why-must-students-learn-so-much/cover.jpg";
import columbiaCover from "@/assets/articles/why-apply-to-columbia/cover.jpg";
import middleSchoolersCover from "@/assets/articles/why-middle-schoolers-need-counselor/cover.jpg";
import capeCodCover from "@/assets/articles/english-class-cape-cod/cover.jpg";
import summerCampCover from "@/assets/articles/summer-camp-journal/cover.jpg";
import kazakhstanCover from "@/assets/articles/kazakhstan-camp/cover.jpg";
import kazakhstanChess from "@/assets/articles/kazakhstan-camp/chess.jpg";
import kazakhstanClassroom from "@/assets/articles/kazakhstan-camp/classroom.jpg";
import kazakhstanProfessor from "@/assets/articles/kazakhstan-camp/professor.jpg";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "lead"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "video"; provider: "youtube"; id: string; title: string };

export type Article = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  cover: string | null;
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "kazakhstan-camp",
    tag: "Student Stories",
    title: "Students from Kazakhstan at 4Schoolers' Competition Camp",
    description:
      "A weekend in Brookline: bright students from Kazakhstan join 4Schoolers for competition math, world history, AI with a BU professor, and a simul against a chess Grandmaster.",
    date: "August 13, 2024",
    readTime: "4 min read",
    cover: kazakhstanCover,
    blocks: [
      {
        type: "lead",
        text:
          "This weekend, a group of bright students from Kazakhstan visited 4Schoolers on Beacon Street, and excited voices filled the used-to-be empty conference room.",
      },
      {
        type: "p",
        text:
          "Listen closely, and you will be surprised by the content these students exchange: world history, geography, competitive math, and Artificial Intelligence. Well, the room was sometimes quieter during the competition camp. On the last day of the Kazakhstan students' visit, 4Schoolers invited a chess Grandmaster to play with these enthusiastic students simultaneously.",
      },
      {
        type: "img",
        src: kazakhstanChess,
        alt: "Students play chess simultaneously against a Grandmaster at 4Schoolers' Competition Camp",
      },
      {
        type: "p",
        text:
          "The thrill of having the opportunity to hone one's chess skills was irresistible; even the math teacher jumped into the game against the professional player.",
      },
      {
        type: "img",
        src: kazakhstanClassroom,
        alt: "Students from Kazakhstan during a class at 4Schoolers' Brookline studio",
      },
      {
        type: "p",
        text:
          "Their learning did not end with strategic competition. The students were exposed to cutting-edge knowledge as well: Professor Vasilkoski, lecturer at Boston University, brought to the feast of knowledge a more technical taste to the palette—Artificial Intelligence. The students were so captivated that they asked Professor Vasilkoski for group photos after class, and they would not let this rare opportunity slip away easily: students chased after the teacher and kept asking more questions until they had to leave for the next stop.",
      },
      {
        type: "img",
        src: kazakhstanProfessor,
        alt: "Professor Vasilkoski from Boston University teaches an AI lecture to the Kazakhstan cohort",
      },
    ],
  },
  {
    slug: "english-class-cape-cod",
    tag: "Student Stories",
    title: "An English Class in Cape Cod",
    description:
      "On a summer week in a Cape-styled house, students and teachers explore Dead Poets Society, Walt Whitman, and the question: what is a good life?",
    date: "August 1, 2024",
    readTime: "5 min read",
    cover: capeCodCover,
    blocks: [
      {
        type: "lead",
        text:
          "This summer, intense sunlight blanketed the East Coast with unbearable heat. However, the heat did not hamper the festive summer mood in Cape Cod. The dense grove filtered out most of the blinding light and the cool sea breeze from the vast Atlantic Ocean, leaving the trails in Cape Cod cozy places to walk on. A group of students and teachers arrived in a full Cape-styled house, devoting their energy to English and computer science classes.",
      },
      {
        type: "p",
        text:
          "In a place with a pleasant climate, students and the teacher delved into a profound theme in an English class: what is a good life? The novella Dead Poets Society, a significant piece of literature, served as a guide for the teacher and the students as they explored the story of a group of high school students transitioning to find their passion for life.",
      },
      {
        type: "quote",
        text:
          "The question, O me! so sad, recurring—What good amid these, O me, O life?\n\nAnswer.\n\nThat you are here—that life exists and identity,\nThat the powerful play goes on, and you may contribute a verse.",
        cite: "\"O Me! O Life!\" by Walt Whitman",
      },
      {
        type: "p",
        text:
          "Our lives are short, but by reading the stories of others, we can experience the frustration, love, sorrow, hope, and so much more from these characters. Life exists and identity, and our differences in identities contribute to this vibrant world. Our differences are the verdant grove between us and the searing sunlight in the vast, cloudless, blue sky. Diving deep into each character's emotion, growth, and interactions with one another, the students navigated through the trails of vivid portrayals of the characters' lives. Through them, the students found their own verse-in-progress.",
      },
      {
        type: "p",
        text:
          "The passion was ignited through poetry and storytelling. Something was lit in the students' eyes that could light up the whole Cape Cod village.",
      },
      {
        type: "p",
        text:
          "\"Carpe Diem!\" The student's excited voice escaped the car, leaving Cape Cod, as she excitedly waved at the English teacher. The teacher beamed with an irrepressible smile, knowing that the student would embrace every moment of her life and seize the day.",
      },
      {
        type: "p",
        text:
          "Through programs like these at 4Schoolers, we encourage our students to think critically and philosophically. Exploring literature is one way we promote well-roundedness and meaningful discussion.",
      },
    ],
  },
  {
    slug: "summer-camp-journal",
    tag: "Student Stories",
    title: "Success is palpable (Summer Camp Journal)",
    description:
      "A teacher's journal from the Cape Cod academic camp: how two sisters quietly demonstrated what success really looks like — confidence, good habits, and curiosity.",
    date: "July 11, 2024",
    readTime: "4 min read",
    cover: summerCampCover,
    blocks: [
      {
        type: "quote",
        text: "I would love to talk to their parents about their parenting techniques.",
      },
      {
        type: "p",
        text:
          "As the academic camp in Cape Cod concluded, the teachers chatted about two students loading their luggage into the trunk. It had been an intense week for both the teachers and the students. Standing outside the house where the summer camp took place, they could feel the afternoon breeze carry away their anxiety and fatigue, and the small moments during the summer camp came rushing back to their minds.",
      },
      {
        type: "p",
        text:
          "It was strange that extra effort was required to recall the content taught in class, but interactions with students flowed smoothly like a high-definition video montage. This was amusingly similar to the reminiscence and observation of the students: one cannot see if students are going to be successful just by evaluating their performance in academia but by observing how they operate in life in general.",
      },
      {
        type: "p",
        text:
          "Among all the brilliant and academically strong students, two sisters stood out. Despite the draining classes, the girls were still willing to walk the extra mile. Literally and figuratively.",
      },
      {
        type: "p",
        text:
          "The girls would wake up at six every morning and exercise for two hours in the gym before breakfast. In the evening, they would go out for a stroll or jog, enjoying the nature of Cape Cod. Besides their dedication to leading a healthy life, the girls lived the moments deliberately: they actively conversed with instructors during meals, asking interesting questions like, \"If you were teaching high school English classes, what five books would you assign to your students and why?\" The table was never dull, with the lighthearted exchange of opinions on deeper topics.",
      },
      {
        type: "p",
        text:
          "Success is subjective, but students with confidence, good habits, and curiosity are never far from their goals. Success cannot be written as a specific formula, but it is palpable when one is set in the right direction.",
      },
    ],
  },
  {
    slug: "emotional-intelligence",
    tag: "Pedagogy",
    title: "Emotional Intelligence: why do we care so much about it",
    description:
      "Selective colleges look for students who thrive academically in the classroom, socially in the dorms, and professionally afterward. Why EQ has become a defining metric of admissions.",
    date: "July 11, 2024",
    readTime: "7 min read",
    cover: emotionalIntelligenceCover,
    blocks: [
      {
        type: "lead",
        text:
          "In recent years, emotional intelligence (EI) has emerged as a critical factor in education. Selective colleges are looking for students who will not only be successful academically in the classroom but also socially in the dorms and dining halls and professionally in their chosen careers well after they graduate. But why do we care so much about EI?",
      },
      { type: "h2", text: "What is Emotional Intelligence" },
      {
        type: "p",
        text:
          "Emotional intelligence refers to recognizing, understanding, managing, and using emotions effectively. It encompasses five key components:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Self-Awareness: Recognizing one's emotions and their impact.",
          "Self-Regulation: Managing one's emotions in healthy ways.",
          "Motivation: Harnessing emotions to pursue goals with perseverance.",
          "Empathy: Understanding and sharing the feelings of others.",
          "Social Skills: Building and maintaining healthy relationships.",
        ],
      },
      {
        type: "p",
        text:
          "These components work together to create a framework that supports emotional and social well-being, which is crucial in the educational environment. Putting this in an over-generalized way: EI helps communicate with and regulate relationships with others and oneself.",
      },
      { type: "h2", text: "The Importance of Emotional Intelligence" },
      {
        type: "p",
        text:
          "Enhanced Academic Performance: Numerous studies have shown that students with high emotional intelligence tend to perform better academically. This is not surprising, as EI enables students to manage stress, stay motivated, and maintain focus, which are all essential for academic success. When students can regulate their emotions, they are better equipped to handle the pressures of tests and deadlines, leading to improved grades and a more positive school experience.",
      },
      {
        type: "p",
        text:
          "Improved Relationships: Emotional intelligence fosters stronger relationships with peers, teachers, and family members. Students with high EI are more adept at understanding and responding to the emotions of others, which helps to create a supportive and collaborative classroom environment. Empathy and good social skills reduce conflicts and promote cooperation, making the school a more pleasant and productive place for everyone.",
      },
      {
        type: "p",
        text:
          "Better Mental Health: Emotionally intelligent students are better equipped to handle the pressures of school and life. They are more resilient and less prone to anxiety and depression. By understanding and managing their own emotions, these students are better at seeking help when needed and employing strategies to maintain their mental well-being. This leads to a healthier, more balanced approach to school and life.",
      },
      {
        type: "p",
        text:
          "Increased Engagement: When students feel understood and valued, they are more engaged in their learning. Emotional intelligence contributes to a positive classroom atmosphere where students feel safe to express themselves and take risks. This engagement is crucial for deep learning and intellectual growth, as students are more likely to participate actively and take ownership of their education.",
      },
      {
        type: "p",
        text:
          "Emotional intelligence is crucial for future success in both the workplace and personal life. Employers increasingly value employees who can work well in teams, communicate effectively, and navigate complex social dynamics. By fostering EI in students, schools must prepare them not just for academic success but for a fulfilling and successful life.",
      },
    ],
  },
  {
    slug: "why-must-students-learn-so-much",
    tag: "Pedagogy",
    title: "Why Must Students Learn So Much",
    description:
      "A pedagogical answer to a question every parent eventually asks: why ten subjects when a teacher only teaches one — and why much of what is forgotten still shapes how the mind works.",
    date: "June 18, 2024",
    readTime: "8 min read",
    cover: learnSoMuchCover,
    blocks: [
      {
        type: "lead",
        text:
          "The question I have been frequently asked by parents is: \"You teachers only need to focus on teaching one subject, and my child has to deal with ten. Why do we need to learn so much if we are going to forget most of them anyway?\"",
      },
      {
        type: "p",
        text:
          "Before answering the question, we have to ask: \"What is the purpose of education?\" Without philosophizing this topic and turning it into a book, let me keep the answer simple: \"To provide means for solving problems in the world and insights of approaching an enjoyable life.\"",
      },
      {
        type: "p",
        text:
          "In today's rapidly evolving world, education must go beyond textbooks and traditional classrooms. As we witnessed how Artificial Intelligence played a big role in improving COVID-19 diagnosis, prediction, and treatment, the interdisciplinary approach to solving problems in the modern-day world is not just common but crucial.",
      },
      {
        type: "p",
        text:
          "There is a nuance; however, that requires careful distinction: education does not give answers to big life questions. In the Lotus Sutra, Buddha mentions the central concept, \"expedient means\" (upaya), where the teachers must tailor their teachings to the audience. The different paths of teaching itself are important lessons—it is an ability to adapt and solve complex problems. Education does not give direct answers but provides options to tackle the tasks at hand.",
      },
      {
        type: "p",
        text:
          "As for the effect of a well-rounded education on life, John Keating, from the book Dead Poets Society, beautifully puts it: \"Medicine, law, business, engineering, these are noble pursuits and necessary to sustain life. But Poetry, beauty, romance, love—these are what we stay alive for.\" What are we if we are not equipped with education to appreciate what makes us humans?",
      },
      {
        type: "p",
        text:
          "This is why learning a wide range of subjects is important—it equips students with the knowledge and skills they need to navigate and contribute to this complex world. As the late Steve Jobs said in his 2005 Stanford Commencement speech, \"You've got to find what you love…Keep looking until you find it. Don't settle.\" And to find true love in life, one must \"Stay hungry. Stay foolish.\" Keep on learning!",
      },
    ],
  },
  {
    slug: "why-apply-to-columbia",
    tag: "Universities",
    title: "Why You Should Apply to Columbia University",
    description:
      "Founded in 1754 as King's College, Columbia remains one of the most distinctive Ivies — a research university wrapped inside a great American city.",
    date: "June 16, 2024",
    readTime: "6 min read",
    cover: columbiaCover,
    blocks: [
      {
        type: "lead",
        text:
          "Columbia University, founded in 1754 as King's College, is one of the oldest and most prestigious Ivy League institutions in the United States. Located in the vibrant city of New York, it offers a diverse range of academic programs and is renowned for its distinguished faculty, rigorous curriculum, and pioneering research. Read more to see why you should apply to Columbia University.",
      },
      { type: "h2", text: "Unparalleled Educational Resources" },
      {
        type: "p",
        text:
          "One of the greatest advantages of studying at Columbia University is its relationship with the surrounding community. As a Columbia student, one has access to most public and private museums and exhibitions for free. In addition, as the largest city in the United States, New York City attracts leading experts from all professions worldwide, and it is common that some of these experts are invited to lecture in one of the classes Columbia University offers.",
      },
      { type: "h2", text: "Academically Well-Rounded Designed Curriculum" },
      {
        type: "p",
        text:
          "Every Columbia University student must fulfill the Core Curriculum requirements to graduate. The Core Curriculum (The Core) is the heart of the Columbia College education. The mission of the Core is to provide all students with wide-ranging perspectives, a deeper understanding of history, and critical and creative thinking skills through the study of literature, science, philosophy, music, and art. Each course in the Core undergoes regular review and revision to respond to the ever-changing challenges of our modern world and to incorporate a growing number of perspectives and experiences. Through all of these changes, the Core has provided an enriching liberal arts experience of community, active learning, and interdisciplinary inquiry in the larger context of a research university.",
      },
      { type: "h2", text: "Powerful Alumni Network" },
      {
        type: "p",
        text:
          "One significant advantage of being part of Columbia University is the powerful alumni network that opens doors to a wealth of job opportunities. Columbia's alumni are found in top positions across a wide range of industries, from finance and technology to healthcare and the arts. This extensive network bridges students and the professional world, providing access to internships, job placements, and career advancement opportunities. Through networking events, industry-specific panels, and alumni mentoring programs, students can connect with experienced professionals who are often eager to offer guidance, share insights, and even recommend candidates for positions within their organizations. The university's Career Services office frequently collaborates with alumni to host career fairs, resume workshops, and interview preparation sessions, further enhancing students' readiness to enter the job market.",
      },
    ],
  },
  {
    slug: "sheldon-glashow-interview",
    tag: "Student Stories",
    title:
      "4Schoolers Student Interviews Nobel Prize Winning Physicist Sheldon Glashow",
    description:
      "How student Nichole Wong (Sage School '24), guided by 4Schoolers, secured an interview with Nobel laureate Sheldon Glashow — and what it tells us about the kinds of opportunities a real mentor can open.",
    date: "April 15, 2024",
    readTime: "5 min read",
    cover: null,
    blocks: [
      {
        type: "lead",
        text:
          "At 4Schoolers we work tirelessly to ensure our students have the maximum number of opportunities to explore their interests. Student Nichole Wong (Sage School '24) has long been passionate about physics and exploring the different pathways people take in the sciences. In order to help deepen her understanding of the subject we were delighted to help her arrange a conversation with Nobel Prize winning physicist Dr. Sheldon Glashow. The two sat down for a conversation where they discussed Dr. Glashow's early life, pathways to science, career as a scientist and professor, and the roadblocks he encountered along the way.",
      },
      {
        type: "p",
        text:
          "You can listen to their full discussion below.",
      },
      {
        type: "video",
        provider: "youtube",
        id: "PolrbC2COkQ",
        title:
          "Sage Student Nichole Wong Interview with Nobel Prize Winner Sheldon Glashow",
      },
    ],
  },
  {
    slug: "picking-a-high-school",
    tag: "Strategy",
    title: "Picking a High School for College Admissions Success",
    description:
      "College strategy starts long before 12th grade. The high school you choose shapes the trajectory — and in today's admissions climate, that choice matters more than most families realize.",
    date: "March 25, 2024",
    readTime: "10 min read",
    cover: null,
    blocks: [
      {
        type: "lead",
        text:
          "There are many factors to consider when deciding where to go for high school. One of the purposes of high school is setting you up for success in college. Given the competitive nature of college admissions these days, it is key to consider enrolling yourself in a high school that will set you up for success. Here are some factors to consider when choosing a high school.",
      },
      { type: "h2", text: "1. Academics" },
      {
        type: "p",
        text:
          "The cornerstone of any learning institution is, of course, academics. This means that you should look for a school that offers the coursework that you are interested in and that it is delivered in a way in line with your learning style. For instance, some schools do not offer computer science or high-level science courses. If those are subjects you want to have access to in your school, consider finding a different institution. You can always take extra classes and enroll in programs outside of school, but many students prefer to have these subjects in their schools.",
      },
      {
        type: "p",
        text:
          "Also, it is important to know the learning philosophy of the school before you enroll. Some schools value test taking skills over more innovative forms of assessments such as presentations, debates, and hands-on projects. Some schools also choose to follow standardized curriculums such as the International Baccalaureate (IB) or Advanced Placement (AP) coursework. Successful completion of these classes and their associated exams can allow you to bypass certain college classes (depending on the subject and the college in which you enroll). If this is something you value, you may want to consider enrolling in a school that offers such classes.",
      },
      { type: "h2", text: "2. Extracurricular Opportunities" },
      {
        type: "p",
        text:
          "Whether you are enrolling as a day or boarding student the extracurricular offerings of a school is crucial to consider. Some schools may have a greater emphasis towards sports, others towards academic activities such as Model UN, and other schools have a strong balance between the two. Depending on how you gravitate, you may want to select a school accordingly, but keep in mind that most successful applicants to top colleges have pursued sports as well as other extracurricular activities. There are some schools that offer more sports opportunities to competitive athletes and often cut more casual or less experienced players from their teams. If you fall into the latter category it is worth asking the school if they have Junior Varsity and other teams before enrolling.",
      },
      { type: "h2", text: "3. An Environment in Which You Can Thrive" },
      {
        type: "p",
        text:
          "When making their admissions decisions, colleges consider how students leveraged the opportunities available to them in their high school. This means that in order to get into the nation's most competitive colleges students should plan to maximize all of the opportunities available to them on campus (as well as taking on roles outside school). Therefore, if your school offers AP classes, you should plan to take them. The same goes with extracurricular activities. This does not mean you should do everything at your school and spread yourself too thin. Instead it means that in each \"category\" of school life — academics, athletics, and extracurricular / community involvement — you should aim to participate in the highest level offered. This way you will stand out from other students at your same school.",
      },
      {
        type: "p",
        text:
          "Environment also plays a large role in this. Your school and teacher recommendations are crucial in having a successful application, so making sure that you are in a school where your contributions will be valued and you can make deep connections with faculty is key. In essence, make sure that you go to a school where you can see yourself not only grow but perform well.",
      },
      {
        type: "p",
        text:
          "Choosing a high school is not an easy task, but by keeping in mind the key factors of academics, extracurriculars, and environment, you can ensure that you pick a school that works for you. If you want to learn more about our high school admissions and selection process, book a commitment-free call with 4Schoolers today.",
      },
    ],
  },
  {
    slug: "why-middle-schoolers-need-counselor",
    tag: "Early Prep",
    title: "Why Middle Schoolers Should Work with a College Counselor",
    description:
      "The path from middle school to college is full of quiet decision points. Gentle planning early on removes future stress and keeps doors open to specialized programs and the most selective schools.",
    date: "March 19, 2024",
    readTime: "8 min read",
    cover: middleSchoolersCover,
    blocks: [
      {
        type: "lead",
        text:
          "The journey from middle school to college is filled with opportunities and also challenges. Beginning this journey with the guidance of a college counselor can set the stage for a successful and fulfilling educational career. Here's why middle schoolers should consider working with college counselors early on:",
      },
      { type: "h2", text: "Personalized Academic and Extracurricular Planning" },
      {
        type: "p",
        text:
          "A college counselor can provide invaluable guidance for personalized long-term academic and extracurricular planning. This tailored approach goes beyond just course selection; it involves identifying the right high school that complements the student's strengths, interests, and future goals. By focusing on the individual needs and aspirations of the student, counselors ensure that their advisees are well-positioned for success, both in high school and beyond. A college counselor can also help advise students on sports, extracurricular activities, and personal projects that will boost the student's application and skills.",
      },
      { type: "h2", text: "Building a Connection with the Counselor Early" },
      {
        type: "p",
        text:
          "Engagement with a college counselor allows for the development of a meaningful and lasting relationship. With a deep understanding of the student's history, strengths, and ambitions, the counselor will be uniquely equipped to identify colleges and universities that not only meet academic criteria but also align with the student's personality and career aspirations. This personalized approach maximizes the student's chances of admission to schools where they will thrive.",
      },
      { type: "h2", text: "Development of Soft Skills" },
      {
        type: "p",
        text:
          "College counselors do more than academic planning; they provide opportunities for students to develop essential soft skills. Workshops and classes on time management, interview preparation, and guest lectures are just a few examples of how counselors can help students grow. These skills are crucial for success in high school, college, and beyond, making early development a key advantage for middle schoolers.",
      },
      { type: "h2", text: "Access to Exclusive Opportunities" },
      {
        type: "p",
        text:
          "By working with 4Schoolers, middle school students gain access to a range of exclusive opportunities. We periodically send our students information on internship opportunities that provide real-world experience and scholarships. Early engagement with a college counselor ensures that students are well-informed and able to take advantage of these opportunities as they arise.",
      },
      {
        type: "p",
        text:
          "Engaging with a college counselor during middle school is an investment in the student's future. It provides personalized guidance, fosters strong relationships, aids in the development of soft skills, and offers access to unique opportunities. This proactive approach not only prepares students for the challenges of high school and college admissions but also sets them on a path to personal and academic success.",
      },
      {
        type: "p",
        text:
          "Ready to take the first step towards securing your future success? Sign up for a free consultation with a 4Schoolers college counselor today and unlock the door to your dreams.",
      },
    ],
  },
  {
    slug: "why-apply-to-mit",
    tag: "Universities",
    title: "Why You Should Apply to MIT",
    description:
      "MIT runs one of the nation's most selective undergraduate programs — and one of its most distinctive cultures. A guide to who thrives there, and how to read MIT's signal in your application.",
    date: "February 17, 2024",
    readTime: "9 min read",
    cover: null,
    blocks: [
      {
        type: "lead",
        text:
          "The Massachusetts Institute of Technology (MIT) is one of the world's leading universities in science and technology. The school sits on the Charles River in Cambridge, Massachusetts, just across the river from Boston. MIT hosts one of the nation's most selective undergraduate programs, and for good reason. Read more to see why MIT should be at the top of your college list.",
      },
      { type: "h2", text: "Unlimited Undergraduate Opportunities" },
      {
        type: "p",
        text:
          "With almost 5000 undergraduate students each year, MIT has endless opportunities for advancement as early as freshman year. The Undergraduate Research Opportunities Program (UROP) is open to all undergraduates starting their first semester. Through a UROP position, students gain laboratory experience, technical skills in their fields of interest, and one-on-one mentoring immediately. Unlike other research and internship programs, you don't need to have experience to start. UROP provides students with the boost they need as early as possible to be leaders in academia, industry, and beyond.",
      },
      { type: "h2", text: "Mentoring Resources" },
      {
        type: "p",
        text:
          "Many students feel lost in rigorous classes where everyone has different levels of experience. Luckily, MIT has a wide array of resources for specific classes, departments, and general support. Connecting with a tutor or becoming one is as easy as submitting a quick form on your class website or the department- and school-wide resources, such as the Talented Students Resource Room (TSR²), Office of the First Year, Student Support Services (S³), IEEE-HKN, and so many more. Furthermore, there are many mental health support systems implemented throughout MIT, such as MIT Health and MIT DoingWell, whose new Wellbeing Lab hosts student- and faculty-led workshops on self-care, finances, nutrition, yoga, and more. You can become a Wellbeing Ambassador to help facilitate the many levels of support MIT has.",
      },
      { type: "h2", text: "Notable Alumni" },
      {
        type: "p",
        text:
          "MIT's alumni include Nobel Laureates, CEOs, astronauts, lead physicians, and more. These alumni give back to the MIT community through funding scholarships, programs, and departments and hosting career fairs to recruit current students. With MIT's connections across the world, students are guaranteed the best in the professional world.",
      },
      { type: "h2", text: "A Community Like No Other" },
      {
        type: "p",
        text:
          "MIT is undoubtedly an incredibly difficult school. With support from classmates, dormmates, and extracurricular peers, the student community is united in academic challenges, making daunting problem sets and exams feel exciting and manageable. The campus is filled with empathy and encouragement from students to be their best in multiple facets, not just academics.",
      },
      {
        type: "p",
        text:
          "If you have your eyes set on MIT or any other top-tier universities, 4Schoolers is here to help. Every year, we help students gain admission to the best universities on the planet through a personalized approach that shows our students' best qualities to the admissions committees.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return articles.slice(0, count);
  // Prefer same tag, then fill with others.
  const sameTag = articles.filter(
    (a) => a.slug !== slug && a.tag === current.tag,
  );
  const others = articles.filter(
    (a) => a.slug !== slug && a.tag !== current.tag,
  );
  return [...sameTag, ...others].slice(0, count);
}
