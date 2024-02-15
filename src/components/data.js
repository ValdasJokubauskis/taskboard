export const data = [
  {
    name: "Platform Launch",
    tasks: [
      {
        id: 1,
        title: "Build UI for search",
        description: "This is the Build UI for search task im doing",
        subtasks: [{ subtaskName: "Build UI subtask", checked: false }],
        status: "Todo",
      },
      {
        id: 2,
        title: "Build settings UI",
        description: "This is the Build settings UI task im doing",
        subtasks: [
          { subtaskName: "Build settings subtask one", checked: true },
          { subtaskName: "Build settings subtask two", checked: false },
        ],
        status: "Todo",
      },
      {
        id: 3,
        title: "Design onboarding flow",
        description: "This is the Design onboarding flow task im doing",
        subtasks: [
          { subtaskName: "Design subtask one", checked: true },
          { subtaskName: "Design subtask two", checked: true },
          { subtaskName: "Design subtask three", checked: false },
        ],
        status: "Doing",
      },
      {
        id: 4,
        title: "Ad search endpoints",
        description: "This is the Ad search endpoints task im doing",
        subtasks: [
          { subtaskName: "Ad search subtask one", checked: true },
          { subtaskName: "Ad search subtask two", checked: false },
        ],
        status: "Doing",
      },
      {
        id: 5,
        title: "Ad authentication endpoints",
        description: "This is the Ad authentication task im doing",
        subtasks: [
          { subtaskName: "Ad authentication subtask one", checked: true },
          {
            subtaskName: "Ad authentication subtask two",
            checked: false,
          },
        ],
        status: "Doing",
      },
      {
        id: 6,
        title: "Create wireframe prototype",
        description: "This is the Create wireframe prototype task im doing",
        subtasks: [{ subtaskName: "Create wireframe subtask", checked: true }],
        status: "Done",
      },
      {
        id: 7,
        title: "Review results of usability tests and iterate",
        description:
          "This is the Review results of usability tests and iterate task im doing",
        subtasks: [
          { subtaskName: "Review results subtask one", checked: true },
          { subtaskName: "Review results subtask two", checked: true },
          { subtaskName: "Review results subtask three", checked: true },
        ],
        status: "Done",
      },
      {
        id: 8,
        title: "Competitor analysis",
        description: "This is the Competitor analysis task im doing",
        subtasks: [
          {
            subtaskName: "Competitor analysis subtask one",
            checked: true,
          },
          {
            subtaskName: "Competitor analysis subtask two",
            checked: true,
          },
        ],
        status: "Done",
      },
      {
        id: 9,
        title: "Market discovery",
        description: "This is the Market discovery task im doing",
        subtasks: [{ subtaskName: "Market discovery subtask", checked: true }],
        status: "Done",
      },
    ],
  },
];
