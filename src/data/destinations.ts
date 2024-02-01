
export interface DestinationType {
  id: string
  title: string
  imageSrc?:string
}

export const DESTINATION_LIST: DestinationType[] = [
  { id: 'azerbaijan', title: 'Azerbaijan', imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/azerbaijan.jpg' },
  { id: 'caucasus', title: 'Caucasus' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/caucasus.jpg' },
  { id: 'central-asia', title: 'Central Asia' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/central-asia.jpg' },
  { id: 'china', title: 'China' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/china.jpg' },
  { id: 'georgia', title: 'Georgia' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/georgia.jpg' },
  { id: 'kazakhstan', title: 'Kazakhstan' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/kazakhstan.jpg' },
  { id: 'kyrgyzstan', title: 'Kyrgyzstan' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/kyrgyzstan.jpg' },
  { id: 'russia', title: 'Russia' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/russia.jpg' },
  { id: 'silk-road', title: 'Silk Road' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/silk-road.jpg' },
  { id: 'tajikistan', title: 'Tajikistan' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/tajikistan.jpg' },
  { id: 'turkmenistan', title: 'Turkmenistan' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/turkmenistan.jpg' },
  { id: 'uzbekistan', title: 'Uzbekistan' , imageSrc:'https://tourabi.s3.eu-central-1.amazonaws.com/destinations/uzbekistan.jpg' },
]

