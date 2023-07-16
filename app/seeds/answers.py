from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

day1 = datetime.strptime('2023-02-12', '%Y-%m-%d')
day2 = datetime.strptime('2023-03-05', '%Y-%m-%d')
day3 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day4 = datetime.strptime('2023-07-28', '%Y-%m-%d')
day5 = datetime.strptime('2023-08-11', '%Y-%m-%d')
day6 = datetime.strptime('2023-07-10', '%Y-%m-%d')

# Adds a demo user, you can add other users here if you want
def seed_answers():
    a1 = Answer(
        answer='According to our current understanding of physics, nothing can travel faster than the speed of light in a vacuum. This is known as the universal speed limit. However, there are some phenomena that can appear to exceed the speed of light, such as certain particles that can travel faster than light through a medium like water or air, but they still do not exceed the speed of light in a vacuum.', 
        user_id=2,
        question_id=1,
        created_at=day1.date()
    )
    a3 = Answer(
        answer='''A compiler is a program that translates source code written in a high-level programming language into machine code that can be executed by a computer. The machine code is usually in the form of assembly code or object code, which can be executed directly by the computer's central processing unit (CPU). Compilers are used to create executable programs, libraries and other software components from source code.''', 
        user_id=2,
        question_id=3,
        created_at=day2.date()
    )

    a5 = Answer(
        answer='There are many herbs that are easy to grow at home, but some of the most popular and easiest to care for include basil, cilantro, mint, parsley, chives, and thyme. These herbs can be grown in pots or in a small garden bed, and they require little maintenance. They also add flavor and nutrition to your cooking. If you are new to gardening, I recommend starting with one of these herbs and then expanding your collection as you gain more experience.', 
        user_id=3,
        question_id=5,
        created_at=day3.date()
    )
    a6 = Answer(
        answer='An interpreted language is a type of programming language that is executed directly by an interpreter, rather than being first compiled into machine code. This means that the code is read and executed line by line, rather than being translated into machine code that the computer can execute directly. Some examples of interpreted languages include Python, Ruby, and JavaScript.', 
        user_id=3,
        question_id=6,
        created_at=day4.date()        
    )
    a7 = Answer(
        answer='A medieval village typically consisted of small, thatched-roof houses made of wattle and daub (a mixture of mud, clay, and straw). These houses were often grouped together around a central green or common area. The village would have also had a church or chapel, and possibly a manor house or castle belonging to the local lord or noble. There would have been small plots of land for growing crops and raising animals, as well as a mill for grinding grain. The village would have been surrounded by a wooden or stone wall to protect against raiders. Overall, a medieval village would have been a self-sufficient community, with residents working together to farm, trade and defend their land.', 
        user_id=2,
        question_id=7,
        created_at=day5.date()        
    )
    a8 = Answer(
        answer='''Lorem Ipsum is dummy text used as a placeholder in the design and typesetting industry. It is often used as a placeholder when the final text is not yet available or when the designer wants to focus on the visual aspect of a design without being distracted by the content. The text is derived from a passage in Cicero's De Finibus Bonorum et Malorum (On the Ends of Good and Evil), written in 45 BC.''', 
        user_id=2,
        question_id=8,
        created_at=day6.date()        
    )
    a9 = Answer(
        answer='''As a fan of the horror genre, there's nothing quite like the spine-chilling excitement and adrenaline rush that comes with playing a truly immersive horror game. From the darkness of a haunted mansion to the eerie corridors of a derelict asylum, these virtual experiences have the power to send shivers down your spine and keep you on the edge of your seat.

One of my all-time favorite horror games is "Silent Hill 2." With its atmospheric setting, psychological storytelling, and chilling sound design, this masterpiece creates a sense of dread and unease like no other. It delves into the depths of human psyche, exploring themes of guilt, grief, and existential horror, leaving a lasting impact on players long after they've put down the controller.

Another standout title is "Amnesia: The Dark Descent." This game throws you into the shoes of a protagonist with amnesia, trapped in a nightmarish castle. With limited resources and a lurking presence that you must hide from, the game excels in building a sense of helplessness and paranoia. The immersive sound design and clever use of darkness and tension make it an unforgettable journey into terror.

For those seeking a more recent gem, "Resident Evil 7: Biohazard" deserves mention. This game revitalized the classic survival horror franchise, plunging players into a dilapidated plantation mansion filled with grotesque creatures and a haunting atmosphere. The first-person perspective intensifies the fear factor, as you navigate claustrophobic spaces and solve puzzles to uncover the dark secrets within.

What makes these games truly special is their ability to immerse players in a world where danger lurks around every corner. They tap into our primal fears, using atmosphere, sound, and storytelling to evoke a genuine sense of terror. Whether it's the psychological horror of Silent Hill, the oppressive dread of Amnesia, or the heart-pounding survival of Resident Evil, each game offers a unique and unforgettable experience.

While the horror genre may not be for everyone, for those who dare to enter these virtual nightmares, the rewards are plentiful. These games provide an adrenaline-fueled thrill ride, a captivating narrative, and a chance to confront our deepest fears in a controlled environment.

So, dim the lights, put on your headphones, and prepare for a rollercoaster of fear and excitement. These horror games are not for the faint of heart, but for those who embrace the darkness, the rewards are hauntingly unforgettable.''',
    user_id=2,
    question_id=4,
    created_at=day6.date()
    )  
    db.session.add(a1)
    db.session.add(a3)
    db.session.add(a5)
    db.session.add(a6)
    db.session.add(a7)
    db.session.add(a8)
    db.session.add(a9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))
        
    db.session.commit()