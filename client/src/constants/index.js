import { bargeringIcon, homeIcon, locatoinIcon, safeIcon } from "../assets";

const whyRide = [
  {
    icon: homeIcon,
    title: "Get doorstep pickup",
    description:
      "No need to go looking for a taxi on the streets. Find a ride at your doorstep at the tap of a button.",
    delay: 0.5,
  },
  {
    icon: locatoinIcon,
    title: "Go where you need to",
    description:
      "Tired of taxi drivers refusing to go to your destination? Request hey taxi to go anywhere around your city.",
    delay: 0.7,
  },
  {
    icon: bargeringIcon,
    title: "Skip the bargaining",
    description: "Get low-cost rides with estimated prices displayed upfront.",
    delay: 0.9,
  },
  {
    icon: safeIcon,
    title: "Ride safer at all times",
    description:
      "With industry-leading safety features like live GPS tracking and 24/7 safety support, you can now ride safer.",
    delay: 0.11,
  },
];

const howToRide = [
  {
    title: " Request",
    description:
      "Open the app and enter your destination in the “Where to?” box. Once you confirm that your pickup and destination addresses are correct, select taxi. Once you’ve been matched with a driver, you’ll see their picture and vehicle details and can track their arrival on the map.",
  },
  {
    title: "Ride",
    description:
      "Check that the vehicle details match what you see in the app before getting in the vehicle. Your driver has your destination and directions for the fastest way to get there, but you can always request a specific route.",
  },
  {
    title: "Hop out",
    description:
      "You’ll be automatically charged through your payment method on file, so you can exit the vehicle as soon as you arrive. Remember to rate your driver to help keep  safe and enjoyable for everyone.",
  },
];

export { whyRide, howToRide };
