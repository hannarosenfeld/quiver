from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

day1 = datetime.strptime('2023-01-11', '%Y-%m-%d')
day2 = datetime.strptime('2023-02-03', '%Y-%m-%d')
day3 = datetime.strptime('2023-05-10', '%Y-%m-%d')
day4 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day5 = datetime.strptime('2023-03-10', '%Y-%m-%d')
day6 = datetime.strptime('2023-04-20', '%Y-%m-%d')
day7 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day8 = datetime.strptime('2022-12-08', '%Y-%m-%d')
day9 = datetime.strptime('2023-05-15', '%Y-%m-%d')
day10 = datetime.strptime('2021-02-02', '%Y-%m-%d')

def seed_posts(): 
    p1 = Post(
        content="""
        Ludwig Wittgenstein, born on April 26, 1889, was an Austrian-British philosopher widely regarded as one of the most influential figures in 20th-century philosophy. His work, which spanned several fields including logic, philosophy of language, mind, and mathematics, had a profound impact on the development of analytical philosophy.
        Wittgenstein's early philosophical work emerged in his groundbreaking book "Tractatus Logico-Philosophicus," published in 1921. In this work, he sought to establish a logical and language-based foundation for philosophy. Wittgenstein believed that the primary function of language was to represent facts and that philosophical problems were a result of misunderstandings about language.
        The "Tractatus" presented a highly formal and austere account of language and logic, famously stating that "the limits of my language mean the limits of my world." According to Wittgenstein, meaningful statements were those that could be logically analyzed and corresponded to states of affairs in the world. He argued that any statement that fell outside these limits was nonsensical and should be discarded.
        However, Wittgenstein later underwent a significant shift in his philosophical thinking. In his posthumously published work, "Philosophical Investigations" (1953), he abandoned the strict logical framework of the "Tractatus" and adopted a more language-game approach to philosophy. He focused on the way language is used in various contexts and activities and emphasized the importance of language in social and practical situations.
        Wittgenstein argued that language should be understood as a form of life and that meaning was not solely determined by the correspondence between words and objects. Instead, meaning arose from the ways language is used within a specific community or language-game. He introduced the concept of "language-games" to illustrate the diverse uses of language in different contexts, such as giving orders, reporting facts, or playing a game.
        Throughout his career, Wittgenstein aimed to clarify the nature of language and the limits of meaningful expression. He was concerned with philosophical problems related to knowledge, meaning, perception, and the mind, and his ideas have had a lasting impact on various disciplines, including philosophy, linguistics, cognitive science, and literary theory.
        Wittgenstein's philosophy continues to be the subject of extensive debate and interpretation. His distinctive approach to language and philosophy challenged traditional views and inspired new directions of thought. Whether one aligns more with his earlier logical positivist views or his later emphasis on language-games, Wittgenstein's ideas remain an integral part of the philosophical landscape, stimulating intellectual discourse and exploration to this day. 🌍📖
        """,
        user_id=1,
        created_at=day1.date()
    )
    p2 = Post(
        content="""
        Georg Wilhelm Friedrich Hegel, born on August 27, 1770, was a German philosopher and one of the most prominent figures in Western philosophy. Hegel's work had a profound influence on various areas of thought, including philosophy, politics, history, and aesthetics. His philosophical system, often referred to as "Hegelianism," revolutionized the way we understand human knowledge, history, and the nature of reality.

        Hegel's philosophy is best known for his concept of dialectics, which he used to explain the development of ideas and the progress of history. According to Hegel, reality is characterized by a dialectical process in which contradictions and conflicts lead to the formation of new ideas and states of being. This process, known as the dialectic, involves the thesis (an initial idea or condition), the antithesis (a contradictory idea or condition), and the synthesis (a new and higher stage that reconciles the thesis and antithesis).

        One of Hegel's most influential works is his monumental book "Phenomenology of Spirit" (1807). In this work, he explored the development of self-consciousness and the evolution of human understanding through various stages of experience. Hegel argued that human knowledge and consciousness advance through a dialectical process of overcoming contradictions and arriving at higher levels of truth and comprehension.

        Another major contribution by Hegel is his political philosophy, particularly expounded in his book "Elements of the Philosophy of Right" (1820). Hegel believed that the state played a crucial role in fostering individual freedom and the realization of human potential. He advocated for a rational and ethical state that recognizes the rights of its citizens while promoting their moral and social well-being.

        Hegel's ideas on history also had a profound impact. He saw history as a progressive unfolding of the Geist (spirit or mind), where ideas and cultures develop over time. Hegel argued that historical events and conflicts were not random but rather part of a larger purpose, leading humanity towards self-realization and freedom.

        While Hegel's philosophy has been subject to various interpretations and critiques, his work continues to shape contemporary philosophy. His emphasis on the dialectical process, historical progress, and the interplay of ideas and contradictions has influenced many subsequent thinkers, including Karl Marx, who adopted and modified Hegelian ideas to develop his theory of dialectical materialism.

        Hegel's philosophy remains a subject of ongoing scholarly inquiry, debate, and admiration. His complex and intricate system of thought provides a rich framework for exploring questions about the nature of knowledge, history, freedom, and human consciousness. By examining the intricate web of ideas woven by Hegel, we can continue to engage in profound philosophical reflection and gain new insights into the complexities of the world we inhabit. 
        """,
        user_id=1,
        created_at=day2.date()
    )
    p3 = Post(
        content="""
        Greetings, fellow minds! Today, let's embark on an exciting journey into the future of psychology, where boundless possibilities await. As we peer into the crystal ball of progress, we uncover a tapestry of transformative changes and promising developments that will shape the field of psychology in the coming years. Brace yourselves for a glimpse of what lies ahead!

        1 Technological Advancements: Technology is set to revolutionize the way we approach psychology. With the rapid advancement of artificial intelligence, virtual reality, and machine learning, therapeutic interventions will become more accessible, personalized, and immersive. Imagine therapy sessions conducted in virtual environments tailored to specific needs, allowing individuals to confront and overcome their fears or traumas in a safe yet realistic way.

        2 Digital Mental Health: As digital platforms become an integral part of our lives, the integration of mental health services within these spaces will expand. Online therapy, mental health apps, and wearable devices will continue to gain prominence, providing individuals with real-time support, personalized interventions, and data-driven insights to monitor and improve their well-being. The future holds the potential for AI-powered chatbots and virtual assistants specifically designed to address mental health concerns.

        3 Neuroscience and Brain-Machine Interfaces: Our understanding of the brain is growing exponentially, and neuroscience will play a pivotal role in shaping the future of psychology. Advancements in brain imaging techniques, such as functional MRI and EEG, will enable us to unravel the mysteries of the mind, leading to more targeted interventions and personalized treatments. Additionally, brain-machine interfaces hold promise for enhancing therapeutic interventions and empowering individuals with conditions such as paralysis or neurodegenerative disorders.

        4 Positive Psychology and Well-being: As society's focus shifts towards holistic well-being, positive psychology will continue to gain prominence. Rather than solely addressing mental illness, the future of psychology will emphasize cultivating strengths, resilience, and flourishing. Interventions will encompass mindfulness, gratitude practices, character strengths development, and fostering positive relationships, contributing to overall psychological well-being and fulfillment.

        5 Cultural Competence and Diversity: Recognizing the importance of cultural competence, the field of psychology will increasingly embrace diversity and inclusivity. Culturally sensitive assessment tools, therapeutic approaches, and research practices will emerge, ensuring that mental health services are accessible and effective for individuals from diverse backgrounds. Collaboration between psychology and other disciplines will foster a comprehensive understanding of the complex interplay between culture, society, and mental health.

        6 Preventive and Early Intervention: The future will witness a shift towards preventive and early intervention approaches, aiming to identify and address mental health concerns before they escalate. Schools, workplaces, and communities will prioritize mental health promotion, fostering resilience, emotional intelligence, and stress management skills from a young age. Public health campaigns will destigmatize seeking help and encourage proactive mental health care.

        While these predictions offer a tantalizing glimpse into the future, it's important to remember that psychology is a dynamic field, constantly evolving to adapt to new challenges and discoveries. As we embrace these advancements, we must also remain vigilant, addressing ethical considerations, ensuring privacy and data protection, and safeguarding the human touch that lies at the core of the therapeutic relationship.

        So, fellow explorers of the mind, let us step forward into the future of psychology with open hearts and open minds, embracing innovation, compassion, and the limitless potential of human transformation. Together, we can unlock new horizons and shape a future where psychological well-being knows no bounds.
        """,
        user_id=2,
        created_at=day3.date()
    )
    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.commit()



def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()