### DB design

```js
const user = {
  // TODO for hospital type
  _id: "",
  userGroup: "", // doctor, patient, nurse
  profile: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "", // male, female
    imageProfile: "",
  },
  address: "_id",
  account: {
    currentAccount: "_id",
    accountList: [],
  },
}

const account = {
  _id: "",
  user_id: "",
  type: "normal",
  identityChannel: "facebook", // facebook, google, phoneNumber
  identity: {
    facebook: {},
    google: {},
    phoneNumber: {},
  },
  userName: "",
  password: "",
  tempPassword: "",
  isForceResetPassword: false,
  role: ["_id"],
}

const role = {
  _id: "",
  name: "admin", // admin, superAdmin, user
  permission: {
    accessProfile: true,
    editUserProfile: true,
    canBooking: false,
  },
  priority: 1,
}

const address = {
  _id: "",
  address: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  postCode: "",
  city: "",
  zip: "",
  state: "",
  country: "",
}

const hospital = {
  _id: "",
  name: "",
  phoneNumber: [],
  website: "",
  address: {},
  branch: [],
}

const hospitalBranch = {
  _id: "",
  hospital_id: "",
  name: "",
  phoneNumber: [],
  website: "",
  address: {},
  departments: [], // medicalDepartments
}

const medicalDepartments = {
  _id: "",
  name: "",
  description: "",
  hospital_id: "",
  branch_id: "",
  doctors: [],
}

const doctors = {
  _id: "",
  user_id: "_id",
  department_id: "",
  hospital_id: "",
  hospitalBranch_id: "",
  medicalDepartments_id: "",
  specificSkill: "",
  ratings: 0,
  review: [
    {
      rating: 4.5,
      comment: "",
    },
  ],
  working: {
    day: [
      {
        name: "MON",
        isActive: false,
      },
      {
        name: "WUE",
        isActive: false,
      },
      {
        name: "WED",
        isActive: false,
      },
      {
        name: "WHU",
        isActive: false,
      },
      {
        name: "FRI",
        isActive: false,
      },
      {
        name: "SAT",
        isActive: false,
      },
      {
        name: "SUN",
        isActive: false,
      },
    ],
    time: [
      {
        name: "06:00",
        isActive: false,
      },
      {
        name: "08:00",
        isActive: false,
      },
      {
        name: "10:00",
        isActive: false,
      },
      {
        name: "12:00",
        isActive: false,
      },
      {
        name: "14:00",
        isActive: false,
      },
      {
        name: "16:00",
        isActive: false,
      },
      {
        name: "18:00",
        isActive: false,
      },
      {
        name: "20:00",
        isActive: false,
      },
    ],
  },
}

const booking = {
  _id: "",
  parent_id: "",
  requestBy: "user_id",
  requestTo: "doctor_id",
  state: "", // waitForScreening, scanning ,waitForDoctor, diagnosing, diagnosed
  status: "", // booking, cancel, complete, completeWithCondition
  datetime: "",
  symptom: "",
  dayOfSymptom: 0,
  attachment: "",
  updateBy: "nurse_id",
  doctorComment: "",
  isSendingToSpecialized: false,
  sendingDetail: {
    department: "",
  },
  createData: "",
  updateDate: "",
}

// case 1
//  - history
//  - history
//  - history
```
