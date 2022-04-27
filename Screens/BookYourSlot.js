import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";
// import { ScrollView } from "react-native-virtualized-view";
import ConditionalRenderList from "../components/ConditionalRenderList";
import DistrictList from "../components/DistrictList";
import CropList from "../components/CropList";
import Menu from "../components/Menu";
import BottomBar from "../components/BottomBar";
import { authentication } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const states = [
  //name key is must.It is to show the text in front
  { id: 1, name: "Andhra Pradesh" },
  { id: 2, name: "Arunachal Pradesh" },
  { id: 3, name: "Assam" },
  { id: 4, name: "Bihar" },
  { id: 5, name: "Chhattisgarh" },
  { id: 6, name: "Goa" },
  { id: 7, name: "Gujarat" },
  { id: 8, name: "Haryana" },
  { id: 9, name: "Himachal Pradesh" },
  { id: 10, name: "Jammu and Kashmir" },
  { id: 11, name: "Jharkhand" },
  { id: 12, name: "Karnataka" },
  { id: 13, name: "Kerala" },
  { id: 14, name: "Madhya Pradesh" },
  { id: 15, name: "Maharashtra" },
  { id: 16, name: "Manipur" },
  { id: 17, name: "Meghalaya" },
  { id: 18, name: "Mizoram" },
  { id: 19, name: "Nagaland" },
  { id: 20, name: "Odisha" },
  { id: 21, name: "Punjab" },
  { id: 22, name: "Rajasthan" },
  { id: 23, name: "Sikkim" },
  { id: 24, name: "Tamil Nadu" },
  { id: 25, name: "Telangana" },
  { id: 26, name: "Tripura" },
  { id: 27, name: "Uttar Pradesh" },
  { id: 28, name: "Uttarakhand" },
  { id: 29, name: "West Bengal" },
];
let districts = [
  [],
  [
    "Anantapur",
    "Chittor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],
  [
    "Tawang",
    "West Kameng",
    "East Kameng",
    "Papum Pare",
    "Kurung Kumey",
    "Kra Daadi",
    "Lower Subansiri",
    "Upper Subansiri",
    "West Siang",
    "East Siang",
    "Siang",
    "Upper Siang",
    "Lower Siang",
    "Lower Dibang Valley",
    "Dibang Valley",
    "Anjaw",
    "Lohit",
    "Namsai",
    "Changlang",
    "Tirap",
    "Longding",
  ],
  [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup Metropolitan",
    "Kamrup",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],
  [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran (Motihari)",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger (Monghyr)",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia (Purnea)",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada (South Bastar)",
    "Dhamtari",
    "Durg",
    "Gariyaband",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham (Kawardha)",
    "Kanker (North Bastar)",
    "Kondagaon",
    "Korba",
    "Korea (Koriya)",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur  ",
    "Surguja",
  ],
  [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East  Delhi",
    "North West  Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West  Delhi",
    "West Delhi",
  ],
  [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha (Palanpur)",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udepur",
    "Dahod",
    "Dangs (Ahwa)",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kachchh",
    "Kheda (Nadiad)",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada (Rajpipla)",
    "Navsari",
    "Panchmahal (Godhra)",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha (Himmatnagar)",
    "Surat",
    "Surendranagar",
    "Tapi (Vyara)",
    "Vadodara",
    "Valsad",
  ],
  [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurgaon",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Mewat",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul &amp; Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur (Sirmour)",
    "Solan",
    "Una",
  ],
  [
    "Anantnag",
    "Bandipore",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kargil",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Leh",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],
  [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribag",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela-Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru (Bangalore) Rural",
    "Bengaluru (Bangalore) Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru (Chikmagalur)",
    "Chitradurga",
    "Dakshina Kannada",
    "Davangere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayapura (Bijapur)",
    "Yadgir",
  ],
  [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills ",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],
  [
    "Aizawl",
    "Champhai",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip",
  ],
  [
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Peren",
    "Phek",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghapur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Sonepur",
    "Sundargarh",
  ],
  [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Mansa",
    "Moga",
    "Muktsar",
    "Nawanshahr (Shahid Bhagat Singh Nagar)",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar (Mohali)",
    "Sangrur",
    "Tarn Taran",
  ],
  [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",
  ],
  ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  [
    "Ariyalur",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Salem",
    "Sivaganga",
    "Thanjavur",
    "Theni",
    "Thoothukudi (Tuticorin)",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhoopalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal",
    "Nagarkurnool",
    "Nalgonda",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal (Rural)",
    "Warangal (Urban)",
    "Yadadri Bhuvanagiri",
  ],
  [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
  ],
  [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],
  [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi (Chatrapati Sahuji Mahraj Nagar)",
    "Amroha (J.P. Nagar)",
    "Auraiya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur (Panchsheel Nagar)",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kanshiram Nagar (Kasganj)",
    "Kaushambi",
    "Kushinagar (Padrauna)",
    "Lakhimpur - Kheri",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "RaeBareli",
    "Rampur",
    "Saharanpur",
    "Sambhal (Bhim Nagar)",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamali (Prabuddh Nagar)",
    "Shravasti",
    "Siddharth Nagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Burdwan (Bardhaman)",
    "Cooch Behar",
    "Dakshin Dinajpur (South Dinajpur)",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Medinipur (West Medinipur)",
    "Purba Medinipur (East Medinipur)",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur (North Dinajpur)",
  ],
];
const crops = [
  "wheat",
  "rice",
  "sugarcane",
  "corn",
  "cotton",
  "green chilli",
  "red chilli",
  "bajra",
  "spinach",
  "bitter gourd",
];
function BookYourSlot({ navigation }) {
  const [state, setState] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [indexOfState, setIndexOfState] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);
  const [distToggle, setDistToggle] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [crop, setCrop] = React.useState();
  const [cropToggle, setCropToggle] = React.useState(false);
  const [userID, setUserId] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigation.navigate("Login");
      }
    });
    setState("");
    setDistrict("");
    setCrop("");
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setToggle(false);
        setDistToggle(false);
      }}
    >
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#207502" />
        <View elevation={5} style={styles.profileView}>
          <Menu
            OnPress={() => navigation.openDrawer()}
            screenName="Book Your Slot"
          />
          <TouchableOpacity style={{ marginRight: 40, marginTop: 4 }}>
            <Avatar.Text
              size={42}
              label="A"
              color="#000"
              style={{ backgroundColor: "#fff" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ alignItems: "center", marginTop: 12 }}>
            <Text style={{ width: "98%", fontSize: 13, textAlign: "center" }}>
              Book Your Slot by selecting state,district and crop below:
            </Text>
          </View>
          <View style={styles.searchbleBox}>
            <View style={styles.textInputBox}>
              <TextInput
                style={styles.searchbleBoxText}
                placeholder="Select State"
                value={state}
                onFocus={() => {
                  setToggle(true);
                  setDistToggle(false);
                  setFocus(true);
                  setState("");
                  setDistrict("");
                  setCrop("");
                  setIndexOfState(0);
                }}
                onChangeText={(text) => {
                  setState(text);
                }}
              ></TextInput>
            </View>

            {toggle && focus && (
              <View style={styles.dropDownContainer}>
                <ConditionalRenderList
                  states={states}
                  state={state}
                  setIndexOfState={setIndexOfState}
                  setState={setState}
                  toggle={toggle}
                  setToggle={setToggle}
                ></ConditionalRenderList>
              </View>
            )}
          </View>
          <View style={styles.searchbleBox}>
            <View style={styles.textInputBox}>
              <TextInput
                style={styles.searchbleBoxText}
                placeholder="Select District"
                value={district}
                onFocus={() => {
                  setToggle(false);
                  setDistToggle(true);
                  setFocus(true);
                  setDistrict("");
                  setCrop("");
                }}
                onChangeText={(text) => {
                  setDistrict(text);
                }}
              ></TextInput>
            </View>

            {distToggle &&
              (state ? (
                <View style={styles.dropDownContainer}>
                  <DistrictList
                    indexOfState={indexOfState}
                    districts={districts}
                    district={district}
                    setDistrict={setDistrict}
                    toggle={distToggle}
                    setToggle={setDistToggle}
                  />
                </View>
              ) : (
                Alert.alert("Please select state first")
              ))}
          </View>
          <View style={styles.searchbleBox}>
            <View style={styles.textInputBox}>
              <TextInput
                style={styles.searchbleBoxText}
                placeholder="Select Crop"
                value={crop}
                onFocus={() => {
                  setToggle(false);
                  setCropToggle(true);
                  setFocus(true);
                  setCrop("");
                }}
                onChangeText={(text) => {
                  setCrop(text);
                }}
              ></TextInput>
            </View>

            {cropToggle &&
              (state || district ? (
                <View style={styles.dropDownContainer}>
                  <CropList
                    crops={crops}
                    crop={crop}
                    cropToggle={cropToggle}
                    setCropToggle={setCropToggle}
                    setCrop={setCrop}
                  />
                </View>
              ) : (
                Alert.alert("Please select state and district first")
              ))}
          </View>
          <View
            style={
              focus
                ? { alignItems: "center", marginTop: "4%", marginBottom: 4 }
                : { alignItems: "center", marginTop: "4%", marginBottom: "26%" }
            }
          >
            <TouchableOpacity
              elevation={2}
              style={{
                height: 44,
                width: "60%",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: "#207502",
                borderRadius: 16,
              }}
              onPress={() => {
                if (state !== "" && district !== "" && crop !== "") {
                  navigation.navigate("MarketDetailsScreen", {
                    state,
                    district,
                    crop,
                  });
                } else Alert.alert("Select state , district and crop first");
              }}
            >
              <Text style={{ alignItems: "center", color: "#fff" }}>
                Get Slot Details
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomBar
          style={{ marginBottom: 6 }}
          onPersonPress={() => {
            navigation.navigate("EditProfileScreen", { userID: userID });
          }}
          onPricePress={() => {
            navigation.navigate("CropPriceScreen");
          }}
          onBookPress={() => {
            navigation.navigate("BookYourSlotScreen");
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flexDirection: "row",
    width: "100%",
    height: 78,
    paddingTop: 16,
    paddingLeft: 16,
    justifyContent: "space-between",
    backgroundColor: "#207502",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileViewText: {
    color: "#fff",
    marginTop: 8,
    paddingLeft: 20,
  },
  searchbleBox: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  textInputBox: {
    height: 42,
    width: "68%",
    marginTop: "10%",
  },
  searchbleBoxText: {
    height: 40,
    paddingLeft: 12,
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#86340A",
  },
  dropDownContainer: {
    flex: 1,
    maxHeight: "50%",
    width: "68%",
    paddingTop: 1,
    paddingRight: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#86340A",
  },
  dropDownItems: {
    padding: 4,
    fontSize: 18,
    // height: 38,
  },
  bottomBar: {
    flexDirection: "row",
    height: "8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#207502",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  bottomButtons: {
    flex: 3,
    padding: 6,
    alignItems: "center",
    // justifyContent: "center",
  },
});
export default BookYourSlot;
