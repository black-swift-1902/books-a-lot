'use strict'
//
const db = require('../server/db')
const {Book, Order, User} = require('../server/db/models')
const sequelize = require('sequelize')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const books = await Promise.all([
    Book.create({
      title:
        'Cracking the Coding Interview: 189 Programming Questions and Solutions',
      imgUrl: 'https://tinyurl.com/yyudjeaq',
      price: 3200,
      description: `Cracking the Coding Interview, 6th Edition is here to help you through this process, teaching you what you need to know and enabling you to perform at your very best. I've coached and interviewed hundreds of software engineers. The result is this book.`
    }),
    Book.create({
      title:
        'Creating Interfaces with Bulma',
      imgUrl: 'https://tinyurl.com/y3gz42as',
      price: 2299,
      description: `This book is a step-by-step guide that will teach how to build a web interface from scratch using Bulma.`
    }),
    Book.create({
      title: 'HTML, CSS, and JavaScript Mobile Development For Dummies',
      imgUrl: 'https://tinyurl.com/y5drwv5w',
      price: 2979,
      description:
        'HTML, CSS, and JavaScript Mobile Web Development For Dummies makes it easy to start developing great sites for mobile devices.'
    }),
    Book.create({
      title: 'King Arthur and His Knights of the Round Table',
      imgUrl: 'https://tinyurl.com/y3pj8jat',
      price: 599,
      description:
        'King Arthur is one of the greatest legends of all time. From the magical moment when Arthur releases the sword in the stone to the quest for the Holy Grail and the final tragedy of the Last Battle, Roger Lancelyn Green brings the enchanting world of King Arthur stunningly to life. One of the greatest legends of all time, with an inspiring introduction by David Almond, award-winning author of Clay, Skellig, Kits Wilderness and The Fire-Eaters.'
    }),
    Book.create({
      title: 'Life, the Universe and Everything (Hitchhikers Guide to the Galaxy)',
      imgUrl: 'https://tinyurl.com/yyagam2k',
      price: 4200,
      description:
        'The unhappy inhabitants of planet Krikkit are sick of looking at the night sky above their heads—so they plan to destroy it. The universe, that is. Now only five individuals stand between the killer robots of Krikkit and their goal of total annihilation.'
    }),
    Book.create({
      title: 'Pro Angular 6 3rd ed. Edition',
      imgUrl: 'https://tinyurl.com/y5plgg4q',
      price: 3618,
      description:
        'Best-selling author Adam Freeman shows you how to use Angular in your projects, starting from the nuts and bolts and building up to the most advanced and sophisticated features, going in-depth to give you the knowledge you need. Chapters include common problems and how to avoid them.'
    }),
    Book.create({
      title: 'This Is Your Brain on Music: The Science of a Human Obsession',
      imgUrl: 'https://tinyurl.com/y3dwztvj',
      price: 676,
      description:
        'In this groundbreaking union of art and science, rocker-turned-neuroscientist Daniel J. Levitin explores the connection between music—its performance, its composition, how we listen to it, why we enjoy it—and the human brain.'
    }),
    Book.create({
      title:
        'The Art of Computer Programming, Volume 1, Fascicle 1: MMIX -- A RISC Computer for the New Millennium',
      imgUrl: 'https://tinyurl.com/y5p4f88g',
      price: 2858,
      description:
        'The Art of Computer Programming (TAOCP) is a comprehensive monograph written by Donald Knuth that covers many kinds of programming algorithms and their analysis!'
    }),
    Book.create({
      title:
        'Understanding Cryptography: A Textbook for Students and Practitioners',
      imgUrl: 'https://tinyurl.com/yy5eal5p',
      price: 4267,
      description:
        'Cryptography is now ubiquitous – moving beyond the traditional environments, such as government communications and banking systems, we see cryptographic techniques realized in Web browsers, e-mail programs, cell phones, manufacturing systems, embedded software, smart buildings, cars, and even medical implants. Todays designers need a comprehensive understanding of applied cryptography.'
    })
  ])

  console.log(`seeded ${books.length} books`)

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const orders = await Promise.all([
    Order.create({date: sequelize.fn('NOW')}).then(async order => {
      await order.setUser(users[0])
      await order.addBooks([books[0], books[1]])
    }),
    Order.create({date: sequelize.fn('NOW')}).then(async order => {
      await order.setUser(users[1])
      await order.addBook(books[2])
    })
  ])

  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
