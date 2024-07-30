import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { faker, simpleFaker } from "@faker-js/faker";

const createUser = async (numUsers) => {
  try {
    const userPromise = []

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "qwerty",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName()
        }
      })
      userPromise.push(tempUser)
    }
    await Promise.all(userPromise)

    console.log("Users Created", numUsers);
    process.exit(1)

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

const createSingleChat = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = []
    for (let i = 0; i < numChats; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatPromise.push(Chat.create({
          name: faker.lorem.words(2),
          members: [users[i], users[j]]
        }))
      }
    }
    await Promise.all(chatPromise)
    console.log("Chats Created Successfully");
    process.exit(1)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

const createGroupChat = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = []
    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length })
      const members = []

      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length)
        const randomUser = users[randomIndex]

        // to avoid duplicates
        if (!members.includes(randomUser)) {
          members.push(randomUser)
        }
      }

      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      })
      chatPromise.push(chat)
    }

    await Promise.all(chatPromise)
    console.log("Chats Created Successfully");
    process.exit(1)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagesPromise = []

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)]
      const randomChat = chats[Math.floor(Math.random() * chats.length)]

      messagesPromise.push(
        Message.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence()
        })
      )
    }
    await Promise.all(messagesPromise)
    console.log("Messages Created Successfully");
    process.exit()
  }
  catch (error) {
    console.log(error);
    process.exit(1)
  }
}

const createMessagesInAChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    const messagesPromise = []

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagesPromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence()
        })
      )
    }
    await Promise.all(messagesPromise)
    console.log("Messages Created Successfully");
    process.exit()
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

export { createUser, createSingleChat, createGroupChat, createMessages, createMessagesInAChat }