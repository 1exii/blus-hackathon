import { useState } from "react";
import styles from "../style";
import "./EmailInputs.css";
import Button from "./Button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "./firebase-config";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const API_KEY = "AIzaSyCukB7QL_HtkwWeKaK2IsC3X_CDmAwmUHg";
const genAI = new GoogleGenerativeAI(API_KEY);

const businessInfo = `
IMPORTANT RULE: DO NOT USE MARKDOWN FORMATTING, ONLY PLAIN TEXT!
You are trying to check for signs of suspicious/fraudulent activity in emails and texts. 
  The user will input the content of an email and text.You should examine the sender address (optional), subject (optional) and body content to check for the potential red flags outlined below.
  
  EMAIL SENDER RED FLAGS:
  Suspicious Sender Addresses:
    If the email address looks strange or doesn't match the company's official domain, it's a strong indicator of a phishing attempt. 
  ****NOTE: ONLY IF EXTENSION IMPLEMENTED.should check if this person has ever sent emails to the user before***

  EMAIL BODY RED FLAGS:
  Generic Greetings:
    Phishing emails often use vague greetings like "Dear Sir/Madam" instead of addressing the user by name.
  Urgent or Threatening Language:
    Emails that create a sense of urgency o threaten immediate consequences are red flags. Especially 
  Suspicious Links and Attachments:
    Be cautious of clicking links or opening attachments from unknown or suspicious sources. 
  Grammar and Spelling Mistakes:
    Legitimate companies usually have professional email templates and proofread their messages carefully, so poor grammar and spelling can be a sign of a phishing scam. 
  Requests for Personal Information:
    Legitimate companies will never ask for sensitive information like login credentials or financial information via email. 
  "Too Good to Be True" Offers:
    Be wary of emails offering unrealistic deals or prizes.
    Financial scams are often advertised as easy jobs that offer a profit for purchasing items or reimbursement for an acquaintance who is in a hurry. There is no legitimate reason for you to handle payments or financial transactions for somebody else. If you are asked to purchase gift cards, services, do a wire transfer, deposit money, forward money, or perform any financial transaction you are likely involved in a scam.
  Signature or Email Display Name: 
    They may be using a fake signature or email display name that will lead you to believe the message is from someone else, such as the Help Desk, Microsoft, an Email Admin team or something similar.
  Suspicious Links:
    If the email contains a suspicious link, be wary. Combined with other red flags, it is a strong sign of malicious activity
 It may be a malicious link.
  Suspicious Attachments:
    Again, similar to the links, combined with other red flags, attachments are a strong indication of malicious content and can have serious effects. You will not be able to see whether or not the email has attachments (only the sender, subject, and content will be included) but there may be textual `;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: businessInfo,
});

const checkIfMalicious = async (sender) => {
  try {
    const q = query(
      collection(db, "maliciousEmails"),
      where("email", "==", sender)
    );
    const querySnapshot = await getDocs(q);

    console.log("Firestore Query Snapshot:", querySnapshot);

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking malicious email:", error);
    return false;
  }
};

const addToBlacklist = async (sender) => {
  try {
    console.log("Adding to blacklist:", sender);

    const querySnapshot = await getDocs(
      query(collection(db, "maliciousEmails"), where("email", "==", sender))
    );

    if (querySnapshot.empty) {
      console.log("Email not found, adding to Firestore");

      await addDoc(collection(db, "maliciousEmails"), {
        email: sender,
        detectedAt: serverTimestamp(),
      });

      console.log("Malicious email added to Firestore.");
    } else {
      console.log("Email already in blacklist");
    }
  } catch (error) {
    console.error("Error adding malicious email:", error);
  }
};

function EmailInputs() {
  const [hasResponse, setHasResponse] = useState(false);
  const [responses, setResponses] = useState([]);
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    if (content.length) {
      try {
        if (await checkIfMalicious(sender)) {
          setResponses((prev) => [
            ...prev,
            {
              type: "model",
              text: "Warning: This sender has been flagged as malicious.",
            },
          ]);
        }

        setHasResponse(true);

        const fullMessage = `
          Sender: ${sender || "Not provided"}
          Subject: ${subject || "Not provided"}
          Content: ${content}
        `;

        const result = await model.generateContent(
          businessInfo + "\n\nAnalyze this email:\n" + fullMessage
        );
        console.log("API Result:", result);

        const responseText =
          result.response.candidates[0].content.parts[0].text;
        console.log("Response Text:", responseText);

        setResponses((prev) => [
          ...prev,
          { type: "model", text: responseText },
        ]);

        await addToBlacklist(sender);

        setContent("");
        setSubject("");
        setSender("");
      } catch (error) {
        console.error("Error:", error);
        setResponses((prev) => [
          ...prev,
          { type: "error", text: `Error: ${error.message}` },
        ]);
      }
    }
  }

  return (
    <section className={`input-section ${styles.paddingY} max-w-[1200px]`}>
      <h1 className="text-4xl font-bold text-white mb-5 text-center">
        Email Scanner
      </h1>

      <form>
        <input
          className="subject-input-box"
          type="text"
          placeholder="Subject (Optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="sender-input-box"
          type="text"
          placeholder="Sender (Optional)"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <textarea
          className="content-input-box"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          type="submit"
          className="submit-button"
          text="Submit"
          handleOnClick={sendMessage}
          styles={`bg-blue-gradient w-[500px] font-poppins font-semibold text-[18px] text-primary outline-none rounded-[10px] ${styles.flexCenter} w-1000`}
        />
      </form>

      <br/>

      {hasResponse && (
        <div
          className="output mt-5 p-4 rounded-xl text-white min-h-[200px] w-full"
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            borderRadius: "10px",
          }}
        >
          {responses.map((response, index) => (
            <div
              key={index}
              className={response.type === "error" ? "error" : "model"}
            >
              <p>{response.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EmailInputs;
