import React, { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import LoadingSpinner from './LoadingSpinner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/nav/Nav';
import Toggler from './components/toggler/Toggler';
const My_journey = lazy(() => import('./components/my_journey/My_journey'));
const Finance = lazy(() => import('./components/finance/Finance'));
const Philosophy = lazy(() => import('./components/philosophy/Philosophy'));
const Science = lazy(() => import('./components/science/Science'));
const Tech = lazy(() => import('./components/tech/Tech'));
const Art = lazy(() => import('./components/art/Art'));
const Politics = lazy(() => import('./components/politics/Politics'));
const Footer = lazy(() => import('./components/footer/Footer'));
const Sign_up = lazy(() => import('./components/sign_up/Sign_up'));
const User_profile = lazy(() => import('./components/user_profile/User_profile'));
import { useAuth } from './AuthContext';

function App() {
  // const my_journey_posts = [
  //   {
  //     id: 1,
  //     title: "Idiocruelocracy",
  //     content: {
  //       intro: "The most excruciating feeling is the realization that you possess immense potential, yet circumstances beyond your control shackle your abilities and thwart your aspirations. It's not your fault; you're hindered by forces beyond your command. These oppressive forces diminish your brilliance, grind down your spirit (not in an enjoyable way, by any means, LOL). Those who have lost hope and chosen different paths somehow seem to thrive while you remain just steps away from your goals. You ponder, why not take those steps? But fear holds you back. The fear of being crushed with no chance of recovery looms large.",
  //       body: "It's a peculiar predicament where individuals of outstanding quality feel ashamed of their excellence. Those with both vision and insight find themselves tormented internally by their own doubts and externally by those who envy their clarity. These envious ones, in turn, are captives of their own insecurities. It's a vicious cycle of people attacking one another, a profoundly disheartening situation. In this milieu, everyone becomes a victim. A victim of ignorance, egotism, and egotism-driven foolishness, a phenomenon I like to call 'idiocruelocracy' (my own term, indeed). This leads to a surreal inversion of conventional wisdom. While the world often preaches self-improvement, here it seems the opposite holds true. In this environment, quality is devalued, and those with no discernible quality are lauded as if they possess everything. You don't seek help from anyone; you're capable of achieving your goals independently. Yet, as you endeavor to make progress, the very people around you, instead of providing support, attempt to control every aspect of your life, from your dietary choices to your daily activities, your social circles to your aspirations.",
  //       conclude: "It's a disconcerting place, an existence characterized by chaos, an unconventional society where absurdity reigns. In the midst of all this, people on Earth continue to speak, attempting to inspire and motivate. They write numerous 'how-to' books, delivering sermons about conquering one's inner demons. They share what they consider the path to wealth and success. However, it appears that in this unique environment, the rules are inverted. Quality is perceived as worthless, while the absence of quality is celebrated as perfection. It's not that you seek assistance from others; you possess the capability to forge your path. But as you strive to do so, it would be a welcome relief if those around you allowed you the freedom to do it your way. Regrettably, they don't extend that courtesy. Instead, they attempt to exert control over every facet of your existence, leaving you feeling ensnared in a web of constraints. It's a bewildering place, a life filled with eccentricities, a society that defies convention at every turn. In the face of such circumstances, you may find yourself wondering, 'What must I do?' The answer remains elusive. But, in the words of Tupac Shakur, 'This ain't living.' Down with idiocruelocracy."
  //     },
  //     image: "https://images.pexels.com/photos/13411949/pexels-photo-13411949.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load ",
  //     date: "2023-10-25",
  //     authorURL: "https://www.facebook.com/yonathan.araia"
  //   }
  // ];

  // let daily_quote_post = {
  //   id: 0,
  //   quote: "A sufficiently advanced technology is indistinguishable from magic",
  //   author: "Arthur C. Clarke"
  // };

  // let finance_posts = [
  //   {
  //     id: 1,
  //     title: "Bitcoin Revolution: Unshackling Finance in the Digital Age",
  //     content: {
  //       intro: "The Bitcoin revolution is a phenomenon marked by its ability to unleash the full potential of decentralized, digital currency. Its origins lie in the ashes of the 2008 financial crisis, a time when trust in traditional financial institutions had eroded. Bitcoin emerged as a response, offering an innovative and trustless alternative. Yet, as it soared to popularity, it faced numerous challenges.",

  //       body: "Bitcoin's journey parallels the struggle for emancipation. It fought against skepticism and prejudice, much like individuals striving to break free from oppressive circumstances. Over time, it garnered supporters who saw its potential to liberate the masses from the constraints of the traditional financial system. The use cases of Bitcoin are multifaceted. It serves as a store of value, much like gold, allowing individuals to safeguard their wealth against inflation. Simultaneously, it enables borderless transactions, empowering those who lack access to traditional banking services. It's a technological innovation that resonates with the values of financial sovereignty and personal empowerment. However, its path has been fraught with challenges, ranging from regulatory hurdles to wild price volatility. Yet, it has weathered these storms, emerging as a beacon of financial freedom for those who dare to embrace it.",
  //       conclude: "The Bitcoin revolution is a testament to the power of innovation in the face of adversity. It's a symbol of a financial system reshaped by trustless, decentralized technology. In a world where the traditional order is being questioned, Bitcoin stands as a beacon of financial liberation, promising individuals control over their wealth and financial destinies. Its journey, much like that of those seeking to overcome their oppressors, is marked by resilience and a commitment to breaking free from conventional constraints. The Bitcoin revolution continues, a transformative force in the world of finance."
  //     },
  //     image: "https://images.pexels.com/photos/315788/pexels-photo-315788.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     date: "2023-10-25",
  //     authorURL: "https://twitter.com/MeronMichael15"
  //   }
  // ]

  // let Slides = [
  //   {
  //     "image": "https://th.bing.com/th/id/OIP.vzzBeaFh3qTZJlOg7X773gHaEK?w=272&h=180&c=7&r=0&o=5&pid=1.7",
  //     "URL": "https://www.youtube.com/@RobertBreedlove22",
  //     "title": "robert breedlove"
  //   },
  //   {
  //     "image": "https://th.bing.com/th/id/OIP.SVcxu8UmF3o0rsFYJradnwHaEo?w=283&h=180&c=7&r=0&o=5&pid=1.7",
  //     "URL": "https://www.youtube.com/@TheRichDadChannel",
  //     "title": "robert kiyosaki"
  //   },
  //   {
  //     "image": "https://static.wixstatic.com/media/9a5cca_0fffb2a6f24344da94bb6b6d9cc2dba9~mv2.jpg/v1/fit/w_1000%2Ch_720%2Cal_c%2Cq_80/file.jpg",
  //     "URL": "https://www.youtube.com/@VALUETAINMENT",
  //     "title": "patric bet david"
  //   },
  //   {
  //     "image": "data:image/jpeg;base64,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",
  //     "URL": "https://www.youtube.com/@peterschiff",
  //     "title": "peter schiff"
  //   },
  //   {
  //     "image": "https://th.bing.com/th/id/OIP.fqxkphhRQSt8X9J4-OQI5gHaE8?w=258&h=180&c=7&r=0&o=5&pid=1.7",
  //     "URL": "https://www.federalreserve.gov/",
  //     "title": "the federal reserve"
  //   }
  // ];

  // let philosophy_article_posts = [
  //   {
  //     id: 1,
  //     title: "Zeno Of Citium",
  //     date: "October 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/zeno-of-citium.png",
  //     content: "Zeno is known as the founding father of stoicism. After a shipwreck robbed him of his merchandise, Zeno was guided to Athens in search of a better way to live. It was in Athens that he was introduced to the philosophy of Socrates and Crates, both of whom influenced him to start an outdoor school that taught sorely about “finding the good life” by living in accordance with virtue and nature. Unlike other philosophers, Zeno chose to teach his message on a porch known as the Stoa Poikile, which is what later gave the Zenonians (the terms used to refer to his followers), the name Stoics.",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   },
  //   {
  //     id: 2,
  //     title: "Marcus Aurelius ",
  //     date: "october 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/marcus-aurelius.jpg",
  //     content: "Marcus Aurelius is known for two things - for being one of the greatest Roman emperors that ever lived, and for his Meditations, which were daily assertations that he used to guide his rule. At the time, Marcus was arguably the most powerful man in the world, and yet he kept himself grounded with stoic mantras. According to Marcus, the use of emotions in reaction to a crisis was irrational, instead, he advocated for the use of rational thinking and the practice of inner calm. Even though his reign was afflicted with numerous trials, Aurelias ruled firmly and yet he did not let go of stoicism's cardinal virtues - justice, courage, wisdom, and temperance.",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   },
  //   {
  //     id: 3,
  //     title: "Epictetus",
  //     date: "october 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/epictetus-public-domain.jpg",
  //     content: "The most fascinating thing about Epictetus is that he was not born to power, but instead, he was born a slave to a rich stateman. By chance, he was allowed to study philosophy and he chose to pursue Stoicism. Later on, he became a free man and went on to start a school in Greece. Here, Epictetus shunned material things and devoted himself to a simple lifestyle and to teaching Stoicism. His main lesson was that there is no need to complain or to worry about that which we can not control but rather accept it as the way of the universe. He also insisted that evil was not a part of human nature but rather a result of our ignorance. Interestingly, throughout his teaching years, Epictetus never wrote down any of his teachings. It is one of his eager students, Arrian, that noted them done thus creating a diary that would become helpful to many powerful men and women including war heroes and emperors such as Marcus Aurelius.",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   },
  //   {
  //     id: 4,
  //     title: "Seneca the Younger",
  //     date: "october 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/seneca.png",
  //     content: "Seneca is known as the most controversial Stoic philosopher. Unlike those before him, he did not denounce a life of material property but rather amassed wealth for himself and rose politically to the point of becoming a senator. In a turn of events, he was exiled on account of adultery but later recalled to become the teacher and advisor to Nero, who later became a notorious Roman emperor known for cruelty and tyranny. Later on, Seneca was falsely implicated in a plot to kill Nero, an event that saw Nero order Seneca to kill himself. It is this final event that cemented Seneca’s place as a Stoic. By practicing apatheia, he controlled his emotions and accepted his fate leading to his slitting his wrists and taking poison. Throughout his controversial life and career, Seneca is known to have written numerous letters, which were collected to create the book, “On the Shortness of Life.” His letters insisted on the need not to worry about events outside our control. ",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   },
  //   {
  //     id: 5,
  //     title: "Chrysippus",
  //     date: "october 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/chrysippus-768x960.jpg",
  //     content: "Chrysippus is famously known as the second founder of Stoicism because he made the philosophy captivating to the Romans. According to Chrysippus, everything in the universe was determined by fate, yet human actions are capable of influencing events and consequences. Therefore, in order to achieve ataraxia (inner peace), we need to take complete control of our emotions, rational thinking, and reactions.",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   },
  //   {
  //     id: 6,
  //     title: "Cleanthes",
  //     date: "october 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/cleanthes.png",
  //     content: "After Zeno's demise, Cleanthes succeeded him as the school leader and developed stoicism by unifying his ideas on logic, ethics, and metaphysics. What made Cleanthes’s teachings different is that rather than teaching about the control of emotions, he abolished them altogether. He stated that in order to achieve happiness, one had to strive for the consistency of reason and logic. This, according to Cleanthes, meant submitting to fate.",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   },
  //   {
  //     id: 7,
  //     title: "Diogenes of Babylon",
  //     date: "october 27, 2023",
  //     image: "https://symbolsage.com/wp-content/uploads/2022/07/diogenes.jpg",
  //     content: "Diogenes was known for his calm and modest speech. He headed the Stoic school in Athens and later was sent to Rome.  His greatest achievement was introducing the ideas of Stoicism to Rome.",
  //     goURL: "https://symbolsage.com/most-famous-stoics/"
  //   }
  // ];

  // let philosophy_posts = [
  //   {
  //     id: 1,
  //     title: "Stoicism Resurfaces: Navigating the Challenges of Modern Life",
  //     content: {
  //       intro: "In today's fast-paced and often turbulent world, the ancient philosophy of Stoicism has experienced a remarkable resurgence in popularity. Its timeless principles, rooted in self-control, rationality, and virtue, have found renewed relevance in the face of modern challenges. Stoicism, which originated in ancient Greece, was first introduced by philosophers like Zeno of Citium and Epictetus. It teaches individuals to focus on what they can control, accept what they cannot, and maintain inner tranquility. This age-old philosophy is not only standing the test of time but thriving in the midst of societal changes and technological advancements.",
  //       body: "One compelling reason why Stoicism has gained prominence in contemporary society is its ability to help individuals cope with the uncertainties and stresses of the modern world. In an era characterized by information overload, constant connectivity, and the relentless pursuit of success, many find themselves overwhelmed by anxiety and external pressures. Stoicism provides a valuable antidote to these issues. Its emphasis on mindfulness, rationality, and ethical living enables people to navigate the chaos with a sense of purpose and calm. By focusing on personal growth, resilience, and moral virtue, individuals can find solace in Stoicism's teachings. Moreover, the Stoic philosophy promotes a profound shift in perspective, encouraging people to detach from materialism and societal expectations. In an age where consumerism and the pursuit of external validation often lead to discontent, Stoicism offers a pathway to contentment through internal reflection and virtue. The idea that happiness comes from within, rather than from external circumstances, has resonated deeply with those seeking fulfillment beyond the superficial trappings of modern life.",
  //       conclude: "In conclusion, Stoicism's enduring relevance in contemporary society lies in its ability to address the timeless challenges of the human condition. Its practical wisdom provides a guiding light through the complexities of the digital age, helping individuals to find meaning, resilience, and inner peace. As people seek refuge from the constant barrage of information and societal pressures, Stoicism stands as a beacon of reason and virtue. It reminds us that, no matter the era, the pursuit of wisdom, self-mastery, and ethical living remains a timeless endeavor. Stoicism's revival demonstrates that, in the face of evolving landscapes, the quest for inner tranquility and moral excellence continues to be a universal aspiration."
  //     },
  //     image: "https://images.pexels.com/photos/18757981/pexels-photo-18757981/free-photo-of-ruins-of-zeus-temple-at-laodicea-turkey.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     date: "october 27, 2023",
  //     authorURL: "https://twitter.com/MeronMichael15"
  //   }
  // ];

  // let science_posts = [
  //   {
  //     id: 1,
  //     title: "AI's Revolutionary Impact: Transforming Healthcare for a Healthier Future",
  //     content: {
  //       intro: "In the ever-evolving landscape of healthcare, the integration of artificial intelligence (AI) promises to be a transformative force. The emergence of AI in the medical field represents a paradigm shift, where advanced algorithms and machine learning models are being harnessed to revolutionize patient care, diagnosis, and treatment. These technological innovations hold the potential to not only improve the accuracy and efficiency of healthcare services but also to make a significant impact on patient outcomes.",
  //       body: "One of the primary areas where AI discoveries are set to leave a lasting mark is in medical diagnostics. AI-driven algorithms can swiftly analyze complex medical data, including radiological images, pathology slides, and genetic information, enabling rapid and accurate disease detection. Such precision is particularly crucial in early disease diagnosis, as it allows for timely intervention and better prognosis. By harnessing the power of AI, medical professionals can diagnose conditions ranging from cancer to rare genetic disorders with greater certainty. Moreover, the implementation of AI-driven predictive analytics has the potential to revolutionize patient care. By analyzing vast datasets and patient histories, AI systems can identify at-risk individuals and tailor personalized treatment plans. This proactive approach to healthcare not only enhances patient experience but also reduces the strain on healthcare systems. Additionally, the health sector is experiencing a significant transformation with the advent of telemedicine and remote monitoring. AI-powered virtual health assistants can offer real-time advice and monitor patients' vital signs, offering a lifeline in remote or underserved areas. The potential to extend healthcare access to more people worldwide is one of the most promising outcomes of AI integration.",
  //       conclude: "As AI continues to advance, its impact on the health sector is poised to be profound. From improved diagnostics to personalized treatment, and the expansion of telemedicine, AI discoveries are at the forefront of a healthcare revolution. The ultimate goal is to enhance patient care, reduce costs, and create a healthcare system that is both efficient and accessible. While challenges remain, the promise of AI in healthcare is undoubtedly a beacon of hope for a healthier and more connected future."
  //     },
  //     image: "https://images.pexels.com/photos/18069238/pexels-photo-18069238/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-ai-powered-tools-can-support-us-and-save-time-it-was-created-by-martina-stiftinger-as-part-of-the-visua.png?auto=compress&cs=tinysrgb&w=1600",
  //     date: "october 27, 2023",
  //     authorURL: "https://twitter.com/MeronMichael15"
  //   }
  // ];

  // let sci_hero_posts = [
  //   {
  //     id: 0,
  //     title: "Will true AI turn against us?",
  //     line: "Will AI become an existential threat to humans?",
  //     image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     link: "https://bigthink.com/questions/will-true-ai-turn-against-us/"
  //   },
  //   {
  //     id: 1,
  //     title: "The Quantum World",
  //     line: " Explore the fascinating world of quantum physics and its implications for technology and science",
  //     image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     link: "https://www.newscientist.com/article/2367423-the-quantum-world-a-concise-guide-to-the-particles-that-make-reality/"
  //   },
  //   {
  //     id: 2,
  //     title: "Space Exploration",
  //     line: "Discuss the latest developments in space exploration, from Mars missions to the search for exoplanets",
  //     image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     link: "https://education.nationalgeographic.org/resource/history-space-exploration/"
  //   },
  //   {
  //     id: 3,
  //     title: "Climate Change",
  //     line: "Dive into the science of climate change, its causes, and potential solutions.",
  //     image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     link: "https://www.britannica.com/science/climate-change"
  //   },
  //   {
  //     id: 4,
  //     title: "Genetic Engineering",
  //     line: "Explore the ethical and scientific aspects of genetic engineering and its applications",
  //     image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     link: "https://en.wikipedia.org/wiki/Genetic_engineering"
  //   }
  // ];
  // // Your main content post
  // const mainPost = sci_hero_posts[0];

  // let tech_posts = [
  //   {
  //     id: 1,
  //     title: "The new World of Artificial General Intelligence",
  //     content: {
  //       intro: "Artificial General Intelligence (AGI) stands as the pinnacle of artificial intelligence, representing a form of machine intelligence that can understand, learn, and apply knowledge across a wide array of tasks, much like the human mind. As the pursuit of AGI accelerates, its impact on society, technology, and our everyday lives becomes increasingly profound.",
  //       body: "AGI promises to revolutionize various industries, from healthcare to finance, by automating complex decision-making processes and opening up new possibilities. With advanced problem-solving capabilities, AGI can help in solving some of the world's most challenging problems, from climate change to disease research. However, its development raises ethical concerns, such as the potential for bias in decision-making algorithms and the displacement of human jobs. The impact of AGI extends beyond technology. It could reshape our economy, requiring us to adapt to a workforce where humans and intelligent machines collaborate. Societal implications, like privacy and security, will demand thoughtful consideration. Additionally, AGI could bring significant changes in geopolitics, as nations compete for dominance in AI research and development.",
  //       conclude: "In conclusion, AGI holds incredible promise, yet its impact is a double-edged sword. It has the potential to enhance human potential and tackle pressing global challenges, but it also carries risks and uncertainties. As we delve into the age of AGI, ethical, societal, and economic implications will be central to the discourse, necessitating a thoughtful and balanced approach to harness its potential for the greater good while mitigating potential pitfalls. The journey to AGI is both exciting and challenging, and its true impact will be revealed as we tread further into this uncharted territory."
  //     },
  //     image: "https://images.pexels.com/photos/8439083/pexels-photo-8439083.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     date: "october 29, 2023",
  //     authorURL: "https://twitter.com/MeronMichael15"
  //   }
  // ];

  // let tech_body_posts = [
  //   {
  //     main_title: "Tech trends",
  //     sub_title: "Stay updated with the latest tech innovations and trends",
  //     main_link: "https://www.producthunt.com/",
  //     image: "https://www.cnet.com/a/img/resize/cfb5289c031fac123eb6e800c914c006802c6c01/hub/2023/09/18/c44256ef-e6c1-41bb-b77b-648792f47c6c/iphone15-pro-64.jpg?auto=webp&fit=crop&height=540&width=960",
  //     article_title: "The Future of Artificial Intelligence",
  //     article_content: "Uncover the potential of AI in reshaping industries and daily life",
  //     article_link: "https://www.forbes.com/sites/forbesbusinesscouncil/2022/05/05/the-future-of-ai-5-things-to-expect-in-the-next-10-years/?sh=148fb5287422",
  //     author_name: "GAURAV TEWARI",
  //     authorURL: "https://twitter.com/GauravTewari"
  //   },
  //   {
  //     main_title: "Apple Event",
  //     sub_title: "Apple's has made its annual iPhone refresh. Here's everything it announced",
  //     main_link: "https://www.apple.com/apple-events/",
  //     image: "https://www.cnet.com/a/img/resize/cfb5289c031fac123eb6e800c914c006802c6c01/hub/2023/09/18/c44256ef-e6c1-41bb-b77b-648792f47c6c/iphone15-pro-64.jpg?auto=webp&fit=crop&height=540&width=960",
  //     article_title: "Apple announces 'scary fast' October event",
  //     article_content: "It is an apparent nod to the likely unveiling of its next-generation silicon chip, M3, as well as Halloween. The company is expected to show off new iMac computers boasting the new powerful chipset in a move that should also boost Mac sales. Mac sales have been down this year",
  //     article_link: "https://edition.cnn.com/2023/10/24/tech/apple-october-event-2023/index.html",
  //     author_name: "Samantha Murphy Kelly",
  //     authorURL: "https://twitter.com/HeySamantha"
  //   }
  // ]

  // let tech_trending_box_posts = [
  //   {
  //     id: 1,
  //     image: "https://i.pcmag.com/imagery/articles/052dySUj05NEHb0fGqS99nP-1.fit_lpad.size_300x169.v1695844863.jpg",
  //     title: "Watch While You Can: Everything Leaving Netflix in November 2023",
  //     link: "https://www.pcmag.com/articles/what-is-leaving-netflix",
  //     author_name: "K. Thor Jensen",
  //     authorURL: "https://twitter.com/kthorjensen"
  //   },
  //   {
  //     id: 2,
  //     image: "https://i.pcmag.com/imagery/articles/03LPS8upTA2i8FouCSBpK0F-1.fit_lpad.size_300x169.v1698441124.jpg",
  //     title: "Apple Watch Ultra 3 Might Not Launch Until 2025",
  //     link: "https://www.pcmag.com/news/apple-watch-ultra-3-might-not-launch-until-2025",
  //     author_name: "Joe Hindy",
  //     authorURL: "https://twitter.com/thatjoehindy"
  //   },
  //   {
  //     id: 3,
  //     image: "https://i.pcmag.com/imagery/articles/04PYPpWWn8Zs8WoS9EhDFff-1.fit_lpad.size_300x169.v1698437112.jpg",
  //     title: "Google Pays $18 Billion Per Year to Be the Default Search Engine on Apple Devices",
  //     link: "https://www.pcmag.com/news/google-pays-18-billion-per-year-to-be-the-default-search-engine-on-apple",
  //     author_name: "Joe Hindy",
  //     authorURL: "https://twitter.com/thatjoehindy"
  //   },
  //   {
  //     id: 4,
  //     image: "https://i.pcmag.com/imagery/articles/05oKSRWC6DYZ2N8qbbdSfwu-1.fit_lpad.size_300x169.v1698433748.jpg",
  //     title: "Twitter's New Ad-Free 'Premium+ Tier' Costs $16 Per Month",
  //     link: "https://www.pcmag.com/news/twitters-new-ad-free-premium-plus-tier-costs-16-per-month",
  //     author_name: "Michael Kan",
  //     authorURL: ""
  //   }
  // ]

  // let art_posts = [
  //   {
  //     id: 1,
  //     title: "The impact of AI on the Art World",
  //     content: {
  //       intro: "The impact of Artificial Intelligence (AI) on the art world has been nothing short of revolutionary. This innovative technology has permeated every aspect of the artistic process, from creation to curation, and has brought both exciting opportunities and challenges. This paragraph will explore the profound influence of AI on art, delving into its pros and cons.",
  //       body: "AI has unleashed a wave of creativity in the art world, enabling artists to experiment with new forms, styles, and mediums. It has empowered creators to generate stunning artworks with the assistance of AI algorithms, often blurring the lines between human and machine-generated art. Additionally, AI has revolutionized art curation and recommendation, making it easier for art enthusiasts to discover pieces that resonate with their preferences. On the other hand, the integration of AI in art has raised concerns about the originality of machine-generated art and its impact on the job market for human artists. The debate over the intellectual property rights of AI-generated art continues to evolve, and the ethical implications surrounding the creative process remain a topic of discussion.",
  //       conclude: "The impact of AI on art is a double-edged sword, bringing exciting prospects for artistic innovation while also raising questions about authenticity and ethics. As technology advances, the art world must navigate these challenges and opportunities to harness the full potential of AI while preserving the essence of human creativity and expression."
  //     },
  //     image: "https://images.pexels.com/photos/2426085/pexels-photo-2426085.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     date: "october 27, 2023",
  //     authorURL: "hhttps://twitter.com/MeronMichael15"
  //   }
  // ];

  // let art_body_posts = [
  //   {
  //     id: 1,
  //     image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1enwhp.img?w=768&h=508&m=6&x=477&y=140&s=122&d=122',
  //     type: 'Hip Hop',
  //     title: 'A Grammy Salute to 50 Years of Hip-Hop to Air in December on CBS',
  //     content: 'A Grammy Salute to 50 Years of Hip Hop is produced by Jesse Collins Entertainment. Collins, Shawn Gee, Dionne Harmon, Claudine Joseph, Fatima Robinson and Jeannae Rouzan-Clay also serve as executive producers. Marcelo Gama serves as director.',
  //     date: 'october 29, 2023',
  //     writer: 'Paul Grein',
  //     link: 'https://www.rollingstone.com/music/news/a-grammy-salute-to-50-years-of-hip-hop-to-air-in-december-on-cbs-20230129/'
  //   },
  //   {
  //     id: 2,
  //     image: 'https://www.rollingstone.com/wp-content/uploads/2023/10/MatthewPerry.jpg?w=831&h=554&crop=1',
  //     type: 'Comedy',
  //     title: 'Matthew Perry, Friends Star, Dead at 54',
  //     content: 'The actor died in an apparent drowning at his Los Angeles home',
  //     date: 'october 29, 2023',
  //     writer: 'ALTHEA LEGASPI',
  //     link: 'https://www.rollingstone.com/music/news/matthew-perry-friends-star-dead-at-54-20230129/'
  //   },
  //   {
  //     id: 3,
  //     image: 'https://www.rollingstone.com/wp-content/uploads/2023/09/LEDE_RS-OR-wall.jpg?crop=188px%2C0px%2C2025px%2C1350px&resize=680%2C453',
  //     type: 'Singer',
  //     title: 'Olivia Rodrigo Is So Over Heartbreak',
  //     content: 'She is living her best life on both coasts while holding nothing back. And thanks to her new album, Guts, the 20-year-old superstar has leveled up — with the whole world watching',
  //     date: 'october 29, 2023',
  //     writer: 'ANGIE MARTOCCIO',
  //     link: 'https://www.rollingstone.com/music/news/olivia-rodrigo-is-so-over-heartbreak-20230129/'
  //   },
  //   {
  //     id: 4,
  //     image: 'https://www.rollingstone.com/wp-content/uploads/2023/10/TaylorSwift-1-1.jpeg?w=680&h=453&crop=1',
  //     type: 'POp',
  //     title: 'Taylor Swift Breaks Her Own Record for Most Streamed Album in a Single Day',
  //     content: "1989 (Taylor's Version) bested her Spotify record for 2022's Midnights",
  //     date: 'october 29, 2023',
  //     writer: 'ALTHEA LEGASPI',
  //     link: 'https://www.rollingstone.com/music/news/taylor-swift-breaks-her-own-record-for-most-streamed-album-in-a-single-day-20230129/'
  //   },
  //   {
  //     id: 5,
  //     image: 'https://www.rollingstone.com/wp-content/uploads/2023/10/GettyImages-1493257581.jpg?w=680&h=453&crop=1',
  //     type: 'Pop',
  //     title: "Halsey Drops Out of Danny Elfman's 'Nightmare Before Christmas' Concerts",
  //     content: "Singer was booked to perform Sally's Song at the Hollywood Bowl alongside the composer who earlier this month was hit with another sexual allegations.",
  //     date: 'october 29, 2023',
  //     writer: 'DANIEL KREPS',
  //     link: 'https://www.rollingstone.com/music/news/halsey-drops-out-of-anny-elfmans-nightmare-before-christmas-concerts-20230129/'
  //   }
  // ];

  // let main_post = art_body_posts[0];

  // let politics_posts = [
  //   {
  //     id: 1,
  //     title: "AI's Shaping of Democracies and Governments",
  //     content: {
  //       intro: "The impact of artificial intelligence (AI) on democracies and governments is a subject of growing significance in today's digital age. AI has the potential to transform the way governments operate and make decisions. On the positive side, AI can enhance the efficiency of public services, automate routine tasks, and improve data analysis for more informed policy-making. It can also aid in the detection of potential threats and ensure the security of nations.",
  //       body: "However, the introduction of AI in government also brings challenges and concerns. There are worries about data privacy, security, and the potential for misuse of AI in surveillance and control. Bias in AI algorithms can lead to discriminatory outcomes in areas like law enforcement and social services. Furthermore, the use of AI in disinformation campaigns and cyber warfare poses significant threats to the integrity of democratic processes.",
  //       conclude: "The impact of AI on democracies and governments is a complex and evolving issue, with both advantages and risks that need to be carefully navigated to ensure a future where AI serves the public good while upholding the principles of democracy and governance."
  //     },
  //     image: "https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     date: "october 27, 2023",
  //     authorURL: "https://twitter.com/MeronMichael15"
  //   }
  // ];

  // let black_body_content = [
  //   {
  //     Id: 1,
  //     title: "No limits to what you can do",
  //     line: "build your community and make it more effective and organized",
  //     link: "https://twitter.com/MeronMichael15",
  //     brands: [
  //       {
  //         icon: "CNN",
  //         link: "https://cnn.com"
  //       }
  //     ],
  //     image1: "https://static.wixstatic.com/media/dea07e_d6e541c7d16849d4895ba5f0b4193ba7~mv2.jpg/v1/fill/w_581,h_370,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Aircest%20Faded%20Window.jpg",
  //     image2: "https://static.wixstatic.com/media/dea07e_80a3b5b9b74a4199b050d0fe7335ac5c~mv2.jpg/v1/fill/w_490,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Aircest%20Website.jpg",
  //     image3: "https://static.wixstatic.com/media/dea07e_2ef2073dc2f54788a79da9294f1db8c9~mv2.jpg/v1/fill/w_163,h_175,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/dea07e_2ef2073dc2f54788a79da9294f1db8c9~mv2.jpg"
  //   }
  // ]

  // let hero_content_box_posts = [
  //   {
  //     id: 1,
  //     title: "Boundless Possibilities",
  //     line: "Unlock your potential with our suite of advanced features to shape your political vision"
  //   },
  //   {
  //     id: 2,
  //     title: "Building a Stronger Political Presence",
  //     line: "Craft a website that enhances your political influence with limitless customization options"
  //   },
  //   {
  //     id: 3,
  //     title: "Limitless Expression",
  //     line: "Explore endless possibilities for website creation, turning your political ideas into reality"
  //   }
  // ];

  //Initialize state to store fetched data
  const [loading, setLoading] = useState(true);
  const [my_journey_posts, setMyJourneyPosts] = useState([]);
  const [daily_quote_post, setDailyQuotePost] = useState({});
  const [finance_posts, setFinancePosts] = useState([]);
  const [Slides, setSlides] = useState([]);
  const [philosophy_article_posts, setPhilosophyArticlePosts] = useState([]);
  const [philosophy_posts, setPhilosophyPosts] = useState([]);
  const [science_posts, setSciencePosts] = useState([]);
  const [sci_hero_posts, setSciHeroPosts] = useState([]);
  const [tech_posts, setTechPosts] = useState([]);
  const [tech_body_posts, setTechBodyPosts] = useState([]);
  const [tech_trending_box_posts, setTechTrendingBoxPosts] = useState([]);
  const [art_posts, setArtPosts] = useState([]);
  const [art_body_posts, setArtBodyPosts] = useState([]);
  const [politics_posts, setPoliticsPosts] = useState([]);
  const [black_body_content, setBlackBodyContent] = useState([]);
  const [hero_content_box_posts, setHeroContentBoxPosts] = useState([]);
  const { dispatch } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then((response) => {
        setMyJourneyPosts(response.data.my_journey_posts);
        setDailyQuotePost(response.data.daily_quote);
        setFinancePosts(response.data.finance_posts);
        setSlides(response.data.finance_slide_posts);
        setPhilosophyArticlePosts(response.data.philosophy_article_posts);
        setPhilosophyPosts(response.data.philosophy_posts);
        setSciencePosts(response.data.science_posts);
        setSciHeroPosts(response.data.sci_hero_posts);
        setTechPosts(response.data.tech_posts);
        setTechBodyPosts(response.data.tech_body_posts);
        setTechTrendingBoxPosts(response.data.tech_trending_box_posts);
        setArtPosts(response.data.art_posts);
        setArtBodyPosts(response.data.art_body_posts);
        setPoliticsPosts(response.data.politics_posts);
        setBlackBodyContent(response.data.black_body_content);
        setHeroContentBoxPosts(response.data.hero_content_box_posts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const action = {
        type: 'LOGIN',
        payload: {
          id: sessionStorage.getItem('userId'),
          userRole: sessionStorage.getItem('userRole'),
          email: sessionStorage.getItem('email'),
          imageUrl: sessionStorage.getItem('imageUrl')
        }
      };

      dispatch(action);
    } else {
      dispatch({ type: 'LOGOUT' });
    }

    setLoading(false);

  }, []);

  return (
    <Router>
      <Nav />
      <Toggler />
      <Suspense fallback={<LoadingSpinner />}>
        {!loading && (
          <Routes>
            <Route path="/" element={<My_journey my_journey_posts={my_journey_posts} daily_quote_post={daily_quote_post} />} />
            <Route path="/finance" element={<Finance finance_posts={finance_posts} Slides={Slides} />} />
            <Route path="/philosophy" element={<Philosophy philosophy_posts={philosophy_posts} philosophy_article_posts={philosophy_article_posts} />} />
            <Route path="/science" element={<Science sci_hero_posts={sci_hero_posts} science_posts={science_posts} />} />
            <Route path="/tech" element={<Tech tech_posts={tech_posts} tech_trending_box_posts={tech_trending_box_posts} tech_body_posts={tech_body_posts} />} />
            <Route path="/art" element={<Art art_body_posts={art_body_posts} art_story_box_posts={art_posts} />} />
            <Route path="/politics" element={<Politics politics_posts={politics_posts} black_body_content={black_body_content} hero_content_box_posts={hero_content_box_posts} />} />
            <Route path="/sign_up" element={<Sign_up />} />
            <Route path="/user_profile" element={<User_profile />} />
          </Routes>
        )}
      </Suspense>
      {!loading && <Footer />}
    </Router >
  )
}

export default App