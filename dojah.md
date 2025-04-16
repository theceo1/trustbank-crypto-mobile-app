DOJAH Documentation 
Nigeria 🇳🇬 DOJAH NIN
Verify NIN with Selfie Image
Lookup and Verify Users NIN with their Selfie Image.
To ensure that your customer is who they say they are, you can allow them take a selfie photo which you can pass on to the Dojah for the verification process
This helps to significantly reduce the possibility of fraud by confirming the person who is inputting the National ID number is who they say they really are.
​

Request
POST: {{baseUrl}}/api/v1/kyc/nin/verify

Header
Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G

Body Parameters
Parameter	Type	Description
last_name OPTIONAL	string	
first_name OPTIONAL	string	
selfie_image REQUIRED	string	Base64 value of the selfie image. NB: Kindly truncate data:image/jpeg;base64, from the selfie_image object and pass only the buffer starting with /9.
nin REQUIRED	string	National Identity Verification Number

📘 NB : Confidence Values ranges from 0% to 100 %
0% - 90% denote match value is false 90% -100% denote match value is true

Response {
    "entity": {
         "first_name": "John",
         "last_name": "Doe",
         "middle_name": "Chinwe",
         "gender": "M",
         "image": "/9j/4AAQScXJSgBBAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwg...",
         "phone_number": "0812345678",
         "date_of_birth": "1993-05-06",
         "nin": "70123456789",
         "selfie_verification": {
             "confidence_value": 99.90354919433594,
             "match": true
         }
    }
}

Test Credentials for Sandbox
Kindly use this Test NIN in sandbox Environment
nin = 70123456789




Dojah Webhooks
Subscribe to Service
Dojah uses webhooks to let your application know when events happen, such as receiving an SMS message. When the event occurs, Dojah makes an HTTP request (usually a POST or a GET) to the URL you configured for the webhook. Dojah’s request will include details of the event such as the service type and Webhook Url. Dojah’s Webhook services allow you to subscribe for webhooks, Fetch all Webhooks subscription, and Delete a Webhook service.
This endpoint allows you to Subscribe to Dojah’s webhook service

Request
POST: {{baseUrl}}api/v1/webhook/subscribe
Headers
Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	private secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G

Body Params
Key	Type	Description
webhook	string	webhook is the webhook url that allows Dojah to send (i.e “push”) data to your application as soon as an event occurs, Create a Test webhook url on webhook.site. Example https://webhook.site/db8ad2b6-91b6-485b-9761-e546b540ccf6
service	string	Type of services [ sms, ngn_wallet, kyc_widget, address, , AML Monitoring]]
Response 
{
 "entity": "Webhook added successfully"
}
An active webhook allows Dojah to send (i.e “push”) data to your application as soon as an event occurs.
Below is the Sample Data that will be sent to your application.
Verification Status.
These are possible verification status : Ongoing, Completed, Pending, Failed
The Sample response data after successful verification

KYC Widget notification
{
    aml: {
        status: false
    },
    data: {
        id: {
            data: {
                id_url: "https://images.dojah.io/id_sample_id_1720624047.jpg",
                id_data: {
                    extras: "",
                    last_name: "John",
                    first_name: "Doe",
                    mrz_status: "",
                    date_issued: "2019-01-01",
                    expiry_date: "2020-01-01",
                    middle_name: "",
                    nationality: "Nigerian",
                    date_of_birth: "1990-01-01",
                    document_type: "National ID",
                    document_number: "123456789"
                },
                back_url: "https://images.dojah.io/id_sample_id_1720624047.jpg"
            },
            status: true,
            message: "Successfully verified your id"
        },
        email: {
            data: {
                email: "abc@gmail.com"
            },
            status: true,
            message: "abc@gmail.com validation Successful"
        },
        index: {
            data: {},
            status: true,
            message: "Successfully continued to the main checks."
        },
        selfie: {
            data: {
                selfie_url: "https://images.dojah.io/selfie_sample_image_1720624219.jpg"
            },
            status: true,
            message: "Successfully validated your liveness"
        },
        countries: {
            data: {
                country: "Nigeria"
            },
            status: true,
            message: "Successfully continued to the next step."
        },
        user_data: {
            data: {
                dob: "1990-12-03",
                last_name: "John",
                first_name: "Doe"
            },
            status: true,
            message: ""
        },
        business_id: {
            image_url: "https://images.dojah.io/selfie_sample_image_1720624219.jpg",
            business_name: "ABC Company LIMITED",
            business_type: "Business",
            business_number: "1237654",
            business_address: "",
            registration_date: ""
        },
        phone_number: {
            data: {
                phone: "234810123456"
            },
            status: true,
            message: "2348103817187 validation Successful"
        },
        business_data: {
            business_name: null,
            business_type: "BN",
            business_number: null,
            business_address: null,
            registration_date: null
        },
        government_data: {
            data: {
                bvn: {
                    entity: {
                        bvn: "222222222222",
                        nin: "",
                        email: "",
                        title: "",
                        gender: "Male",
                        customer: "6bb82c41-e15e-4308-b99d-e9640818eca9",
                        image_url: "https://images.dojah.io/id_John_Doe_1720615487.jpg",
                        last_name: "John",
                        first_name: "Doe",
                        middle_name: "Anon",
                        nationality: "",
                        name_on_card: "",
                        watch_listed: "",
                        date_of_birth: "01-Jun-1982",
                        lga_of_origin: "",
                        phone_number1: "08011111111",
                        phone_number2: "",
                        marital_status: "",
                        enrollment_bank: "",
                        state_of_origin: "",
                        level_of_account: "",
                        lga_of_residence: "",
                        enrollment_branch: "",
                        registration_date: "",
                        state_of_residence: "",
                        residential_address: ""
                    }
                },
               nin: {
                entity: {
                nin: "1234567891",
                firstname: "John",
                middlename: "Doe",
                surname: "Anon",
                maidenname: "",
                telephoneno: "0901234567",
                state: "",
                place: "",
                profession: "ZOOLOGY",
                title: "",
                height: "167",
                email: "",
                birthdate: "1960-01-01",
                birthstate: "",
                birthcountry: "Not Available",
                centralID: "",
                documentno: "",
                educationallevel: "tertiary",
                employmentstatus: "unemployed",
                othername: "",
                pfirstname: "",
                pmiddlename: "",
                psurname: "",
                nspokenlang: "YORUBA",
                ospokenlang: "",
                religion: "christianity",
                residence_Town: "",
                residence_lga: "Alimosho",
                residence_state: "Lagos",
                residencestatus: "birth",
                residence_AddressLine1: "No 2 Anon house, John does estate, Lagos state, Nigeria",
                residence_AddressLine2: "",
                self_origin_lga: "",
                self_origin_place: "",
                self_origin_state: "",
                signature: null,
                nationality: null,
                gender: "Female",
                trackingId: "",
                customer: "1234444y373737373737373737",
                image_url: "https://images.dojah.io/id_SANDBOX_1721830110.jpg"
              }
          }
            },
            status: true,
            message: ""
        },
        additional_document: [
            {
                document_url: "https://dojah-image.s3.amazonaws.com/66bcc73a4ff8e1003100454212aec768-3344-4df5-88f6-7e723c46cbb0.jpeg",
                document_type: "image"
            }
        ]
    },
    value: "123456",
    id_url: "https://images.dojah.io/id_sample_id_1720624047.jpg",
    status: true,
    id_type: "BVN",
    message: "Successfully completed the verification.",
    back_url: "https://images.dojah.io/id_sample_id_1720624047.jpg",
    metadata: {
        ipinfo: {
            as: "AS29465 MTN NIGERIA Communication limited",
            isp: "MTN NIGERIA Communication limited",
            lat: 6.4474,
            lon: 3.3903,
            org: "MTN Nigeria",
            zip: "",
            city: "Lagos",
            proxy: false,
            query: "102.89.34.49",
            mobile: true,
            status: "success",
            country: "Nigeria",
            hosting: true,
            district: "",
            timezone: "Africa/Lagos",
            region_name: "Lagos"
        },
        device_info: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    },
    selfie_url: "https://images.dojah.io/selfie_sample_image_1720624219.jpg",
    reference_id: "DJ-31038041E0",
    verification_url: "https://app.dojah.io/verifications/bio-data/49fd74a4-8181-4ce8-a87a-0e63f7159257",
    verification_mode: "LIVENESS",
    verification_type: "RC-NUMBER",
    verification_value: "123456",
    verification_status: "Completed"
}
Wallet Service notification
{
  "event": "deposit",
  "status": "COMPLETED",
  "environment": "production",
  "data": {
    "wallet_id": "e10xxxxx-xxxx-xxxxx-a26e-xxxxxxxx",
    "transaction_id": "Dojah-20220103060847147",
    "transaction_remarks": "deposit",
    "event_type": "wallet:event:inter",
    "transaction_date": "2022-01-18 13:34:45.992363+00:00"
  }
}
Address verification notification
{
    "entity": {
        "status":"pending",
        "reference_id": "69e10264-4b90-64fe-b4b7-c9dddafd0241",
        "data": {
            "applicant": {
                "first_name": "John",
                "last_name": "Doe",
                "phone": "08012345678",
                "middle_name": "Kabiru",
                "photo": "",
                "gender": "Male",
                "dob": "17/01/1988"
            },
            "location": "7.081273, 8.232523",
            "photos": [
                ""
            ],
            "neighbor": {
                "name": "Anon John",
                "comment": "Very friendly",
                "phone": "08056781234"
            },
            "city": "oshodi",
            "street": "270 Murtala Muhammed Way, Alagomeji. Yaba",
            "lga": "lagos mainland",
            "state": "Lagos",
            "country": "Nigeria",
            "comments": ""        
        }
    }
}    
How to recieve kyc_widget webhook notification
Set In Config object Kindly set webhook object value to true (Boolean)
Example : webhook : true

Webhooks
Fetch All Webhooks
This endpoint allows you to Fetch All your Application Webhooks
###Request
GET:  {{baseUrl}}api/v1/webhook/fetch

Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G
Response 
{
  "entity": [
    {
      "app_id": "61e6bef823664a003647505f",
      "endpoint": "https://webhook.site/ec43b51e-eca7-42f0-b794-fb4f7b8c89d0",
      "environment": "live",
      "service": "sms",
      "confirmation_status": "DELIVERED",
      "date_created": "2022-01-18T14:31:36.810231+01:00",
      "date_updated": "2022-01-18T14:31:36.810319+01:00"
    },
    {
      "app_id": "61e6bef823664a003647505f",
      "endpoint": "https://webhook.site/ec43b51e-eca7-42f0-b794-fb4f7b8c89d0",
      "environment": "sandbox",
      "service": "sms",
      "confirmation_status": "DELIVERED",
      "date_created": "2022-01-18T14:22:22.398813+01:00",
      "date_updated": "2022-01-18T14:22:22.398857+01:00"
    }
  ]
}
Webhooks
Delete Webhook
This endpoint allows you to Subscribe to Dojah’s webhook service​
Request
[DELETE] {{baseUrl}}api/v1/webhook/delete
Header
Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G
Body
Key	Type	Description
service	string	Type of services [ sms, ngn_wallet]
Response Sample
Response 
{
  "entity": "webhook deleted successfully"
}

Webhooks
Verification Details
Get the full details of a verification using Reference ID

Request
[GET] {{baseUrl}}/api/v1/kyc/verification
Header
Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G
Query parameters
Parameter	Type	Description
reference_id	string	Reference ID of Verification on the Dashboard

Response
{
    aml: {
        status: false
    },
    data: {
        id: {
            data: {
                id_url: "https://images.dojah.io/id_sample_id_1720624047.jpg",
                id_data: {
                    extras: "",
                    last_name: "John",
                    first_name: "Doe",
                    mrz_status: "",
                    date_issued: "2019-01-01",
                    expiry_date: "2020-01-01",
                    middle_name: "",
                    nationality: "Nigerian",
                    date_of_birth: "1990-01-01",
                    document_type: "National ID",
                    document_number: "123456789"
                },
                back_url: "https://images.dojah.io/id_sample_id_1720624047.jpg"
            },
            status: true,
            message: "Successfully verified your id"
        },
        email: {
            data: {
                email: "abc@gmail.com"
            },
            status: true,
            message: "abc@gmail.com validation Successful"
        },
        index: {
            data: {},
            status: true,
            message: "Successfully continued to the main checks."
        },
        selfie: {
            data: {
                selfie_url: "https://images.dojah.io/selfie_sample_image_1720624219.jpg"
            },
            status: true,
            message: "Successfully validated your liveness"
        },
        countries: {
            data: {
                country: "Nigeria"
            },
            status: true,
            message: "Successfully continued to the next step."
        },
        user_data: {
            data: {
                dob: "1990-12-03",
                last_name: "John",
                first_name: "Doe"
            },
            status: true,
            message: ""
        },
        business_id: {
            image_url: "https://images.dojah.io/selfie_sample_image_1720624219.jpg",
            business_name: "ABC Company LIMITED",
            business_type: "Business",
            business_number: "1237654",
            business_address: "",
            registration_date: ""
        },
        phone_number: {
            data: {
                phone: "234810123456"
            },
            status: true,
            message: "2348103817187 validation Successful"
        },
        business_data: {
            business_name: null,
            business_type: "BN",
            business_number: null,
            business_address: null,
            registration_date: null
        },
        government_data: {
            data: {
                bvn: {
                    entity: {
                        bvn: "222222222222",
                        nin: "",
                        email: "",
                        title: "",
                        gender: "Male",
                        customer: "6bb82c41-e15e-4308-b99d-e9640818eca9",
                        image_url: "https://images.dojah.io/id_John_Doe_1720615487.jpg",
                        last_name: "John",
                        first_name: "Doe",
                        middle_name: "Anon",
                        nationality: "",
                        name_on_card: "",
                        watch_listed: "",
                        date_of_birth: "01-Jun-1982",
                        lga_of_origin: "",
                        phone_number1: "08011111111",
                        phone_number2: "",
                        marital_status: "",
                        enrollment_bank: "",
                        state_of_origin: "",
                        level_of_account: "",
                        lga_of_residence: "",
                        enrollment_branch: "",
                        registration_date: "",
                        state_of_residence: "",
                        residential_address: ""
                    }
                },
               nin: {
                entity: {
                nin: "1234567891",
                firstname: "John",
                middlename: "Doe",
                surname: "Anon",
                maidenname: "",
                telephoneno: "0901234567",
                state: "",
                place: "",
                profession: "ZOOLOGY",
                title: "",
                height: "167",
                email: "",
                birthdate: "1960-01-01",
                birthstate: "",
                birthcountry: "Not Available",
                centralID: "",
                documentno: "",
                educationallevel: "tertiary",
                employmentstatus: "unemployed",
                othername: "",
                pfirstname: "",
                pmiddlename: "",
                psurname: "",
                nspokenlang: "YORUBA",
                ospokenlang: "",
                religion: "christianity",
                residence_Town: "",
                residence_lga: "Alimosho",
                residence_state: "Lagos",
                residencestatus: "birth",
                residence_AddressLine1: "No 2 Anon house, John does estate, Lagos state, Nigeria",
                residence_AddressLine2: "",
                self_origin_lga: "",
                self_origin_place: "",
                self_origin_state: "",
                signature: null,
                nationality: null,
                gender: "Female",
                trackingId: "",
                customer: "1234444y373737373737373737",
                image_url: "https://images.dojah.io/id_SANDBOX_1721830110.jpg"
              }
          }
            },
            status: true,
            message: ""
        },
        additional_document: [
            {
                document_url: "https://dojah-image.s3.amazonaws.com/66bcc73a4ff8e1003100454212aec768-3344-4df5-88f6-7e723c46cbb0.jpeg",
                document_type: "image"
            }
        ]
    },
    value: "123456",
    id_url: "https://images.dojah.io/id_sample_id_1720624047.jpg",
    status: true,
    id_type: "BVN",
    message: "Successfully completed the verification.",
    back_url: "https://images.dojah.io/id_sample_id_1720624047.jpg",
    metadata: {
        ipinfo: {
            as: "AS29465 MTN NIGERIA Communication limited",
            isp: "MTN NIGERIA Communication limited",
            lat: 6.4474,
            lon: 3.3903,
            org: "MTN Nigeria",
            zip: "",
            city: "Lagos",
            proxy: false,
            query: "102.89.34.49",
            mobile: true,
            status: "success",
            country: "Nigeria",
            hosting: true,
            district: "",
            timezone: "Africa/Lagos",
            region_name: "Lagos"
        },
        device_info: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    },
    selfie_url: "https://images.dojah.io/selfie_sample_image_1720624219.jpg",
    reference_id: "DJ-31038041E0",
    verification_url: "https://app.dojah.io/verifications/bio-data/49fd74a4-8181-4ce8-a87a-0e63f7159257",
    verification_mode: "LIVENESS",
    verification_type: "RC-NUMBER",
    verification_value: "123456",
    verification_status: "Completed"
}
…………………………………….

Webhooks
All Verification
Get the full list of all the verifications on applications
​
Request
[GET] {{baseUrl}}/api/v1/kyc/verifications

Header
Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G

Response
Response
{
    "entity": {
        "data": [
            {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            },
              {
                "reference_id": "DJ-479A8E4159",
                "app_id": "64d4ab23b2793b00401a2993",
                "verificationStatus": "Completed",
                "datetime": "2024-07-19 17:06:05",
                "environment": "production",
                "first_name": "JOHN",
                "last_name": "DOE",
                "middle_name": "ANON",
                "full_name": "JOHN DOE",
                "business_name": "ANON Enterprises",
                "selfieUrl": "https://dojah-kyc.s3.us-east-2.amazonaws.com/sandbox_kyc_image.png",
                "verificationUrl": "https://app.dojah.io/verifications/bio-data/DJ-479A8E4159"
            }
            
        ],
        "meta": {
            "total_count": 107,
            "item_per_page": 10,
            "current_page": 1
        }
    }
}


……………………………………………………………………………………………………..


Nigeria 🇳🇬 DOJAH BVN
Validate BVN (Tier 2 - Intermediate)
The BVN Match service allows you to verify that an account number, first name, last name and middle name of a user matches their BVN.
​
Request
[GET] {{baseUrl}}/api/v1/kyc/bvn
Header
Parameter	Type	Description	
AppId	string	you would need to create an app to get your app ID	
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G	
Query parameters
Parameters	Type	Description	
bvn *	string	A valid bvn	required
first name	string	first name of bvn holder	optional
last name	string	last name of bvn holder	optional
dob	string	date of birth of bvn holder in yyyy-mm-dd	optional
Sample response
[200]
{
    "entity": {
        "bvn": {
            "value": "23456789012",
            "status": true
        },
        "first_name": {
            "confidence_value": 100,
            "status": true
        }
    }
}
[400]
{
    "error": "BVN not found"
}
Test Credentials for Sandbox
Kindly use this Test BVN in sandbox Environment
bvn = 22222222222

Global Identity Verification 🌍
Selfie Photo ID Verification (Tier 3 - Advanced)
Verify Users Photo ID with their Selfie Image in real time

To ensure that your customer is who they say they are, you can allow them to take a selfie photo which you can pass on to the Dojah for verification process
This helps to significantly reduce the possibility of fraud by confirming the person using your product is the account owner at the validated bank.
Note: Confidence value is used to verify match and a confidence value from 60 and above shows a successful match else a mismatch.
To Verify Photo ID with Selfie Image;
​
Request
[POST] {{baseUrl}}/api/v1/kyc/photoid/verify

Header
Parameter	Type	Description
AppId	string	you would need to create an app to get your app ID
Authorization	string	public secret key e.g prod_sk_1T1eSavlZxy02OT3OWlvbxK4G
​
Body parameters
POST Parameter	Type	Description
selfie_image	string	Base64 value of the selfie image NB: Kindly truncate data:image/jpeg;base64, from the selfie_image object.
photoid_image REQUIRED	string	Base64 value of the photoId image NB: Kindly truncate data:image/jpeg;base64, from the selfie_image object.
first_name	string	
last_name	string	
📘 Note : Confidence Values ranges from 0% to 100 %
0% - 90% denote match value is false 90% -100% denote match value is true
​
Response
{
  "entity": {
    "selfie": {
      "confidence_value": 0,
      "match": false,
      "photoId_image_blurry": false,
      "selfie_image_blurry": false,
      "selfie_glare": true,
      "photoId_glare": true,
      "age_range": "26-40 Years",
      "sunglasses": false,
      "card_type": "VOTER'S CARD",
      "last_name": {
			"match": true,
			"last_name": "",
			"confidence_value": 100
		},
		"first_name": {
			"match": true,
			"first_name": "",
			"confidence_value": 100
		}
    }
  }
}
