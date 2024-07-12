export const sampleChats = [
  {
    avatar: ["https://avatar.iran.liara.run/public/89"],
    name: "Jhon Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"]
  },
  {
    avatar: ["https://avatar.iran.liara.run/public/4"],
    name: "Jane Doe",
    _id: "2",
    groupChat: false,
    members: ["1", "2"]
  },

]

export const sampleUsers = [
  {
    avatar: ["https://avatar.iran.liara.run/public/89"],
    name: "Jhon Doe",
    _id: "1",
  },
  {
    avatar: ["https://avatar.iran.liara.run/public/4"],
    name: "Jane Doe",
    _id: "2",
  },
  {
    avatar: ["https://avatar.iran.liara.run/public/9"],
    name: "Jenny Doe",
    _id: "3",
  },
  {
    avatar: ["https://avatar.iran.liara.run/public/7"],
    name: "Jake Doe",
    _id: "4",
  },
]

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://avatar.iran.liara.run/public/89"],
      name: "Jhon Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://avatar.iran.liara.run/public/4"],
      name: "Jhon Doe",
    },
    _id: "2",
  }
]

export const sampleMessage = [
  {
    attachment: [
      {
        public_id: "asldfhl",
        url: "https://3.img-dpreview.com/files/p/TS1200x900~sample_galleries/2829048177/2548548355.jpg"
      }
    ],
    content: "Sample message for building UI",
    _id: "aklsjdhfskldjf",
    sender: {
      _id: "user._id",
      name: "Unknown"
    },
    chat: "chatId",
    createdAt: "2024-07-10T06:16:07.682Z"
  },
  {
    attachments: [
      {
        public_id: "asldfhlasda",
        url: "https://3.img-dpreview.com/files/p/TS1200x900~sample_galleries/2829048177/2548548355.jpg"
      }
    ],
    content: "Sample message No 2 for building UI sadkjfskndlfgjnalsdgnfasdg sdfg sdjfhg dfg hsdfjhgbdjf dsjfhgsdf",
    _id: "aklsjdhfskldjfasdf",
    sender: {
      _id: "laskdfjhj",
      name: "Unknown 2"
    },
    chat: "chatId",
    createdAt: "2024-07-10T06:16:07.682Z"
  }
]

export const dashboardData = {
  users: [
    {
      avatar: "https://avatar.iran.liara.run/public/89",
      name: "Jhon Doe",
      _id: "1",
      username: "jhon_doe",
      friends: 10,
      groups: 4
    },
    {
      avatar: "https://avatar.iran.liara.run/public/4",
      name: "Jane Doe",
      _id: "2",
      username: "jane_doe",
      friends: 22,
      groups: 2
    },
    {
      avatar: "https://avatar.iran.liara.run/public/9",
      name: "Jenny Doe",
      _id: "3",
      username: "janny_doe",
      friends: 33,
      groups: 3
    },
    {
      avatar: "https://avatar.iran.liara.run/public/7",
      name: "Jake Doe",
      _id: "4",
      username: "jake_doe",
      friends: 44,
      groups: 4
    },
  ],

  chats: [
    {
      name: "Group 1",
      avatar: ["https://avatar.iran.liara.run/public/6"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://avatar.iran.liara.run/public/10" },
        { _id: "2", avatar: "https://avatar.iran.liara.run/public/11" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Jhon Doe",
        avatar: "https://avatar.iran.liara.run/public/3"
      },
    },
    {
      name: "Group 2 asdfnbasd askdjfbjklsd",
      avatar: ["https://avatar.iran.liara.run/public/7"],
      _id: "2",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://avatar.iran.liara.run/public/12" },
        { _id: "2", avatar: "https://avatar.iran.liara.run/public/13" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Jake Doe",
        avatar: "https://avatar.iran.liara.run/public/4"
      },
    },
    {
      name: "Group 3",
      avatar: ["https://avatar.iran.liara.run/public/8"],
      _id: "3",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://avatar.iran.liara.run/public/14" },
        { _id: "2", avatar: "https://avatar.iran.liara.run/public/15" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Jenny Doe",
        avatar: "https://avatar.iran.liara.run/public/2"
      },
    },
    {
      name: "Group 4",
      avatar: ["https://avatar.iran.liara.run/public/9"],
      _id: "4",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://avatar.iran.liara.run/public/16" },
        { _id: "2", avatar: "https://avatar.iran.liara.run/public/17" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Jane Doe",
        avatar: "https://avatar.iran.liara.run/public/1"
      },
    },
  ],

  messages: [
    {
      attachment: [],
      content: "Sample message for building UI",
      _id: "aklsjdhfsuikkldjasdf",
      sender: {
        avatar: "https://avatar.iran.liara.run/public/21",
        name: "Unknown"
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-07-10T06:16:07.682Z"
    },
    {
      attachments: [
        {
          public_id: "asldfhlasda",
          url: "https://3.img-dpreview.com/files/p/TS1200x900~sample_galleries/2829048177/2548548355.jpg"
        }
      ],
      content: "Sample message No 2 for building UI sadkjfskndlfgjnalsdgnfasdg sdfg sdjfhg dfg hsdfjhgbdjf dsjfhgsdf",
      _id: "aknblsjdhfsklldjfasdf",
      sender: {
        avatar: "https://avatar.iran.liara.run/public/23",
        name: "Unknown 2"
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-07-10T06:16:07.682Z"
    },
    {
      attachment: [],
      content: "Sample message No 3 for building UI",
      _id: "aklsjdhfgfskldjf",
      sender: {
        avatar: "https://avatar.iran.liara.run/public/20",
        name: "Unknown"
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-07-10T06:16:07.682Z"
    },
    {
      attachments: [
        {
          public_id: "asldfhlasda",
          url: "https://3.img-dpreview.com/files/p/TS1200x900~sample_galleries/2829048177/2548548355.jpg"
        }
      ],
      content: "Sample message No 4 for building UI sadkjfskndlfgjnalsdgnfasdg sdfg sdjfhg dfg hsdfjhgbdjf dsjfhgsdf",
      _id: "aklsjdhfssdgkldjfasdf",
      sender: {
        avatar: "https://avatar.iran.liara.run/public/22",
        name: "Unknown 2"
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-07-10T06:16:07.682Z"
    },
  ]
}