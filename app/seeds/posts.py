from app.models import db, Post, environment, SCHEMA, Upvote
from sqlalchemy.sql import text
from datetime import datetime

day1 = datetime.strptime('2023-01-11', '%Y-%m-%d')
day2 = datetime.strptime('2023-02-03', '%Y-%m-%d')
day3 = datetime.strptime('2023-07-10', '%Y-%m-%d')
day4 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day5 = datetime.strptime('2023-03-10', '%Y-%m-%d')
day6 = datetime.strptime('2023-04-20', '%Y-%m-%d')
day7 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day8 = datetime.strptime('2022-12-08', '%Y-%m-%d')
day9 = datetime.strptime('2023-05-15', '%Y-%m-%d')
day10 = datetime.strptime('2021-02-02', '%Y-%m-%d')


def add_upvotes(post, user_ids):
    upvotes = [Upvote(user_id=user_id, post=post) for user_id in user_ids]
    db.session.bulk_save_objects(upvotes)
    db.session.commit()

def seed_posts(): 
    p1 = Post(
        content="""Are UFOs real or just a figment of human imagination? The debate surrounding unidentified flying objects (UFOs) has been ongoing for decades. Many claim to have witnessed UFO sightings, describing strange and unexplained aerial phenomena. These accounts have sparked curiosity and intrigue, leading to numerous investigations and theories about extraterrestrial life.

The term "UFO" refers to any object or light in the sky that cannot be readily identified by the observer. While most UFO sightings can be attributed to natural or human-made objects, a small percentage remains unidentified even after thorough examination. These unidentified cases are often the ones that fuel speculation about alien visitations.

Numerous organizations, including government agencies, have investigated UFO sightings. Some declassified documents and eyewitness testimonies suggest that there may be more to these sightings than initially meets the eye. However, skeptics argue that many UFO sightings can be explained by misidentifications, hoaxes, or natural phenomena.

The search for answers continues, and scientists, astronomers, and enthusiasts alike remain dedicated to unraveling the mysteries of UFOs. Whether UFOs are evidence of extraterrestrial life or merely reflections of our own fascination with the unknown, they undoubtedly capture our imagination and inspire us to explore the cosmos in search of answers.""",
        user_id=1,
        created_at=day4.date()
    )
    p2 = Post(
        content="""Philosophy is the quest for understanding the fundamental nature of existence, knowledge, values, reason, mind, and existence. It has been a driving force in shaping human thought and civilization for millennia. Philosophers delve into profound questions about reality, ethics, the mind-body problem, free will, and the nature of truth.

The history of philosophy is a tapestry woven with diverse perspectives and theories from thinkers across cultures and eras. From the ancient Greek philosophers like Socrates, Plato, and Aristotle to modern giants like Immanuel Kant and Friedrich Nietzsche, each era brings its unique contributions and challenges to the philosophical landscape.

One of the central inquiries of philosophy is the nature of reality and our place within it. Metaphysics explores questions about the fundamental nature of being, existence, and reality. Epistemology, on the other hand, focuses on the nature and scope of knowledge and the means of acquiring knowledge.

Ethics delves into questions about morality, principles of right and wrong, and how individuals should live and interact with others. Political philosophy examines the organization of societies and the nature of political power and governance.

Philosophy encourages critical thinking and fosters a deeper understanding of ourselves and the world around us. It invites us to question assumptions, examine arguments, and consider the implications of our beliefs and actions.

The quest for philosophical understanding is an ongoing journey. As new challenges and discoveries emerge, philosophy remains a vital and ever-evolving discipline that continues to shape our understanding of life, the universe, and everything in between.""",
        user_id=2,
        created_at=day5.date()
    )
    p3 = Post(
        content="""Biology is the scientific study of life and living organisms. It encompasses a vast array of disciplines, from genetics and evolution to ecology and physiology. As a fundamental science, biology seeks to understand the processes that govern life and the diversity of living organisms on Earth.

One of the central principles of biology is the theory of evolution by natural selection. Proposed by Charles Darwin in the 19th century, this theory explains how species evolve and adapt to their environments over time. The study of genetics further elucidates the mechanisms of inheritance and heredity, revealing the molecular basis of life.

Biology also explores the intricacies of ecosystems and the interactions between living organisms and their environments. Ecologists study how populations of organisms interact within their communities and how these communities function within broader ecosystems.

Cell biology delves into the inner workings of cells, the basic units of life. This field examines cellular structures, functions, and processes, shedding light on fundamental biological processes such as cell division and metabolism.

Advances in biology have led to breakthroughs in medicine, agriculture, and biotechnology. From the discovery of antibiotics to the development of genetically modified crops, biology plays a crucial role in addressing global challenges and improving human well-being.

The study of biology is a never-ending quest to uncover the secrets of life and explore the wonders of the natural world. It invites us to marvel at the complexity of living systems and fosters a deeper appreciation for the interconnectedness of all living things.""",
        user_id=3,
        created_at=day6.date()
    )
    p4 = Post(
        content="""Art is a diverse and expressive form of human creativity. It encompasses a wide range of mediums, including painting, sculpture, music, literature, dance, theater, and film. Throughout history, art has been a powerful means of communication, self-expression, and cultural reflection.

Visual arts, such as painting and sculpture, capture the imagination and emotions of both artists and viewers. Each brushstroke or chisel mark conveys a unique message and evokes different feelings, creating a profound connection between the artwork and its audience.

Music, with its harmonies and melodies, has the power to stir emotions, ignite memories, and transport listeners to different emotional landscapes. Whether it's the soothing notes of classical music or the energetic beats of modern pop, music resonates with individuals on a deeply personal level.

Literature, in the form of novels, poetry, and essays, weaves narratives and ideas that explore the human condition. Through the written word, authors convey complex themes, moral dilemmas, and universal truths that resonate across time and cultures.

Performing arts, including dance and theater, bring stories to life through movement and live performances. The physicality of dance and the theatricality of drama create captivating experiences that engage the senses and emotions.

Artists draw inspiration from their surroundings, personal experiences, and the broader cultural context. They challenge conventions, provoke thought, and provoke dialogue through their creative expressions. Art encourages us to question, to reflect, and to embrace our shared humanity.

From the cave paintings of ancient civilizations to the contemporary masterpieces of modern artists, art has been an integral part of human history and culture. It continues to shape societies, challenge norms, and provide a lens through which we can better understand ourselves and the world around us.""",
        user_id=4,
        created_at=day7.date()
    )
# ... (previous posts)

    p5 = Post(
        content="""Food science is the interdisciplinary study of the physical, biological, and chemical properties of food and the processes involved in its production, preservation, and consumption. It plays a crucial role in ensuring the safety, quality, and nutritional value of the food we eat.

Food scientists investigate the composition of food, its nutritional content, and its potential health benefits. They study how different processing techniques affect the taste, texture, and shelf life of food products. Food preservation methods, such as canning, freezing, and drying, are essential to prevent spoilage and extend the availability of perishable foods.

Understanding the interactions between food components and the impact of cooking methods on nutrient retention is fundamental to promoting healthy diets and preventing nutrient deficiencies. Food scientists also develop innovative food products, considering factors like consumer preferences, sustainability, and global food security.

In recent years, there has been growing interest in the field of food technology, with a focus on creating plant-based alternatives, reducing food waste, and improving food safety through modern techniques. Food science plays a vital role in addressing global challenges, such as feeding a growing population and ensuring food sustainability.

The study of food science involves collaboration across disciplines, including biology, chemistry, engineering, and nutrition. It combines scientific principles with practical applications to advance our understanding of the foods we consume and how they impact our health and well-being.

As we continue to explore new frontiers in agriculture, nutrition, and food production, food science remains at the forefront of innovation and research, driving advancements that shape the future of the food industry and our relationship with food.""",
        user_id=5,
        created_at=day8.date()
    )
    p6 = Post(
        content="""The fascination with the cosmos has long been a driving force in human exploration and curiosity. Astronomy, the scientific study of celestial objects and phenomena, allows us to gaze at the vast expanse of the universe and ponder its mysteries.

One of the fundamental questions in astronomy is the origin and evolution of the universe. The Big Bang theory proposes that the universe began as a hot, dense point and has been expanding ever since. The study of cosmic microwave background radiation provides crucial evidence supporting this theory.

Astronomers explore the nature of stars, galaxies, and other celestial bodies. They investigate the life cycles of stars, from their formation to their eventual demise, leading to phenomena such as supernovae and black holes. The study of galaxies sheds light on the large-scale structure of the universe and the forces that shape it.

Space exploration has opened new frontiers for astronomers, with spacecraft and telescopes providing invaluable data about distant planets, moons, and other celestial bodies. The search for exoplanets, planets outside our solar system, has sparked interest in the possibility of extraterrestrial life.

The field of cosmology delves into the overall structure, composition, and fate of the universe. It examines concepts like dark matter and dark energy, which constitute a significant portion of the universe but remain largely mysterious.

Astronomy not only deepens our understanding of the cosmos but also inspires wonder and awe. Observing the beauty of a starry night sky or witnessing a solar eclipse evokes a sense of connection to the grandeur and complexity of the universe.

Advancements in astronomy continue to shape our understanding of the universe and our place within it. As technology improves and our exploration of space expands, astronomy will continue to be a window into the wonders of the cosmos, fueling our curiosity and pushing the boundaries of human knowledge.""",
        user_id=6,
        created_at=day9.date()
    )
    p7 = Post(
        content="""The field of artificial intelligence (AI) has witnessed remarkable growth and development in recent years. AI is the study and creation of intelligent agents that can perceive their environment, reason, and take actions to achieve specific goals. From self-driving cars to virtual assistants, AI is transforming various industries and reshaping how we interact with technology.

Machine learning, a subset of AI, enables computers to learn from data and improve their performance without explicit programming. This has led to significant breakthroughs in areas like image recognition, natural language processing, and data analysis.

Natural language processing (NLP) allows computers to understand and process human language. It powers virtual assistants like Siri and chatbots that can interact with users in a conversational manner.

Robotics is another area of AI that involves designing and building intelligent machines that can perform tasks autonomously. Robots are used in various fields, including manufacturing, healthcare, and exploration.

AI has also made a profound impact on the field of healthcare. It aids in medical diagnosis, drug discovery, and personalized treatment plans. AI algorithms can analyze vast amounts of medical data to detect patterns and make predictions.

While AI offers immense potential, it also raises ethical and societal concerns. Issues like data privacy, bias in algorithms, and the impact of automation on jobs require careful consideration.

As AI continues to advance, the collaboration between humans and intelligent machines will become increasingly important. The responsible development and deployment of AI technologies will shape the future of industries, societies, and human-machine interactions.""",
        user_id=7,
        created_at=day10.date()
    )
    p8 = Post(
        content="""Ludwig Wittgenstein, born on April 26, 1889, was an Austrian-British philosopher widely regarded as one of the most influential figures in 20th-century philosophy. His work, which spanned several fields including logic, philosophy of language, mind, and mathematics, had a profound impact on the development of analytical philosophy.
Wittgenstein's early philosophical work emerged in his groundbreaking book "Tractatus Logico-Philosophicus," published in 1921. In this work, he sought to establish a logical and language-based foundation for philosophy. Wittgenstein believed that the primary function of language was to represent facts and that philosophical problems were a result of misunderstandings about language.

The "Tractatus" presented a highly formal and austere account of language and logic, famously stating that "the limits of my language mean the limits of my world." According to Wittgenstein, meaningful statements were those that could be logically analyzed and corresponded to states of affairs in the world. He argued that any statement that fell outside these limits was nonsensical and should be discarded.

However, Wittgenstein later underwent a significant shift in his philosophical thinking. In his posthumously published work, "Philosophical Investigations" (1953), he abandoned the strict logical framework of the "Tractatus" and adopted a more language-game approach to philosophy. He focused on the way language is used in various contexts and activities and emphasized the importance of language in social and practical situations.

Wittgenstein argued that language should be understood as a form of life and that meaning was not solely determined by the correspondence between words and objects. Instead, meaning arose from the ways language is used within a specific community or language-game. He introduced the concept of "language-games" to illustrate the diverse uses of language in different contexts, such as giving orders, reporting facts, or playing a game.

Throughout his career, Wittgenstein aimed to clarify the nature of language and the limits of meaningful expression. He was concerned with philosophical problems related to knowledge, meaning, perception, and the mind, and his ideas have had a lasting impact on various disciplines, including philosophy, linguistics, cognitive science, and literary theory.

Wittgenstein's philosophy continues to be the subject of extensive debate and interpretation. His distinctive approach to language and philosophy challenged traditional views and inspired new directions of thought. Whether one aligns more with his earlier logical positivist views or his later emphasis on language-games, Wittgenstein's ideas remain an integral part of the philosophical landscape, stimulating intellectual discourse and exploration to this day. 🌍📖""",
        user_id=1,
        created_at=day1.date()
    )
    p9 = Post(
        content="""Georg Wilhelm Friedrich Hegel, born on August 27, 1770, was a German philosopher and one of the most prominent figures in Western philosophy. Hegel's work had a profound influence on various areas of thought, including philosophy, politics, history, and aesthetics. His philosophical system, often referred to as "Hegelianism," revolutionized the way we understand human knowledge, history, and the nature of reality.

Hegel's philosophy is best known for his concept of dialectics, which he used to explain the development of ideas and the progress of history. According to Hegel, reality is characterized by a dialectical process in which contradictions and conflicts lead to the formation of new ideas and states of being. This process, known as the dialectic, involves the thesis (an initial idea or condition), the antithesis (a contradictory idea or condition), and the synthesis (a new and higher stage that reconciles the thesis and antithesis).

One of Hegel's most influential works is his monumental book "Phenomenology of Spirit" (1807). In this work, he explored the development of self-consciousness and the evolution of human understanding through various stages of experience. Hegel argued that human knowledge and consciousness advance through a dialectical process of overcoming contradictions and arriving at higher levels of truth and comprehension.

Another major contribution by Hegel is his political philosophy, particularly expounded in his book "Elements of the Philosophy of Right" (1820). Hegel believed that the state played a crucial role in fostering individual freedom and the realization of human potential. He advocated for a rational and ethical state that recognizes the rights of its citizens while promoting their moral and social well-being.

Hegel's ideas on history also had a profound impact. He saw history as a progressive unfolding of the Geist (spirit or mind), where ideas and cultures develop over time. Hegel argued that historical events and conflicts were not random but rather part of a larger purpose, leading humanity towards self-realization and freedom.

While Hegel's philosophy has been subject to various interpretations and critiques, his work continues to shape contemporary philosophy. His emphasis on the dialectical process, historical progress, and the interplay of ideas and contradictions has influenced many subsequent thinkers, including Karl Marx, who adopted and modified Hegelian ideas to develop his theory of dialectical materialism.

Hegel's philosophy remains a subject of ongoing scholarly inquiry, debate, and admiration. His complex and intricate system of thought provides a rich framework for exploring questions about the nature of knowledge, history, freedom, and human consciousness. By examining the intricate web of ideas woven by Hegel, we can continue to engage in profound philosophical reflection and gain new insights into the complexities of the world we inhabit.""",
        user_id=1,
        created_at=day2.date()
    )
    p10 = Post(
        content="""Noise music, a genre that challenges conventional notions of melody and harmony, has long been a captivating and polarizing force within the realm of experimental sound. With its roots dating back to the early 20th century avant-garde movements, noise music has evolved into a multifaceted and boundary-pushing art form that continues to captivate and perplex audiences to this day.

At its core, noise music defies conventional musical structures and embraces dissonance, feedback, and distortion as its primary tools of expression. It eschews traditional melodic narratives, instead exploring textures, tones, and timbres that are often abrasive, unsettling, and confrontational. By embracing chaos and embracing the unexpected, noise musicians aim to challenge the very foundations of musical composition and perception.

Noise music is not simply a wall of random noise; it is a carefully crafted soundscape that can evoke a wide range of emotions and experiences. It has the power to provoke introspection, contemplation, and even transcendence. Listeners are encouraged to engage actively with the music, to let go of preconceived notions of what constitutes "good" or "pleasing" sound, and to explore the sonic abyss with an open mind.

The allure of noise music lies in its ability to defy traditional boundaries and expectations, pushing the boundaries of what is considered music. It invites us to question our preconceptions, to challenge our comfort zones, and to embrace the unexpected. Noise music is not for everyone, but for those who dare to delve into its enigmatic realm, it offers a captivating and transformative journey into the uncharted territories of sound.""",
        user_id=2,
        created_at=day3.date()
    )

    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.add(p7)
    db.session.add(p8)
    db.session.add(p9)
    db.session.add(p10)

    db.session.commit()

    # Add upvotes to each post
    add_upvotes(p1, [1, 2, 3, 4, 5])  
    add_upvotes(p2, [1, 2, 3, 4, 5, 6, 7, 8]) 
    add_upvotes(p3, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]) 
    add_upvotes(p4, [2, 4, 6, 8, 10, 12, 14, 16, 18]) 
    add_upvotes(p5, [1, 3, 5, 7, 9, 11, 13, 15, 17]) 
    add_upvotes(p6, [2, 4, 6, 8, 10, 12, 14, 16]) 
    add_upvotes(p7, [1, 3, 5, 7, 9, 11, 13])
    add_upvotes(p8, [4,5,6,7,8,9,13,14,16,18])  
    add_upvotes(p9, [4,5,6,7,8,9,10])  
    add_upvotes(p10, [4,5,6,7,8,9,10,11,12,14])  



def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()