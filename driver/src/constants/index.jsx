import { license, RC, insurance, permit } from "../assets";


// Driver Requirements Steps:
const requirements = [
  {
    head: "Driving License-Front",
    title: "Get started",
  },
  {
    head: "Registration Certificate (RC)",
    title: "Get started",
  },
  {
    head: "Vehicle Insurence",
    title: "Get started",
  },
  {
    head: "Other Information",
    title: "Get started",
  },
];

// Driver Documents Uplod Demo
const docUplod = [
  {
    title: "Take a photo of your Drivig License-Front",
    description:
      "Driving license verification helps to ensure the safety of passengers and the public, and confirms that drivers are legally authorized to operate a vehicle. It also helps the taxi booking app company with local laws and regulations.",
    img: license,
  },
  {
    title: "Take a photo of your Registration Certificate (RC)",
    description:
      "If the vehicle owner name on the vehicle documents is different from mine, then I hereby confirm that I have the vehicle owner's consent to drive this vehicle on the Hey-taxi Platform. This declaration can be treated as a No-Objection Certificate and releases Hey-taxi from any legal obligations and consequences.",
    img: RC,
  },
  {
    title: "Take a photo of your Vehicle Insurance",
    description: "Proof of vehicle insurance is required to protect both passengers and drivers in the event of an accident. This helps to ensure a safe and secure transportation experience for everyone involved.",
    img: insurance
  },
 
];

export {
  requirements,
  docUplod
}