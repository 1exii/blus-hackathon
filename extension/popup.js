const API_KEY = "AIzaSyCukB7QL_HtkwWeKaK2IsC3X_CDmAwmUHg"; // Your API key

const businessInfo = `
  IMPORTANT RULE: DO NOT USE MARKDOWN FORMATTING, ONLY PLAIN TEXT!
  Create new lines when making new points. For instance, here's what you SHOULD DO:
  This email address has been previously flagged for malicious activity.
  This email displays signs of malicious content because... point A.
  It also displays because... point B.
  And... point C.
  You SHOULD NOT:
  This email address has been previously flagged for malicious activity. This email displays signs of malicious content because... point A. It also displays because... point B. And... point C.

  You are trying to check for signs of suspicious/fraudulent activity in emails and texts. 
  The user will input the content of an email and text. You should examine the sender address (optional), subject (optional), and body content to check for the potential red flags outlined below.
  
  EMAIL SENDER RED FLAGS:
  Suspicious Sender Addresses:
    If the email address looks strange or doesn't match the company's official domain, it's a strong indicator of a phishing attempt.
  ****NOTE: ONLY IF EXTENSION IMPLEMENTED.should check if this person has ever sent emails to the user before***

  EMAIL BODY RED FLAGS:
  Generic Greetings:
    Phishing emails often use vague greetings like "Dear Sir/Madam" instead of addressing the user by name.
  Urgent or Threatening Language:
    Emails that create a sense of urgency or threaten immediate consequences are red flags.
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
    They may be using a fake signature or email display name that will lead you to believe the message is from someone else, such as the Help Desk, Microsoft, an Email Admin team, or something similar.
  Suspicious Links:
    If the email contains a suspicious link, be wary. Combined with other red flags, it is a strong sign of malicious activity.
  Suspicious Attachments:
    Again, similar to the links, combined with other red flags, attachments are a strong indication of malicious content and can have serious effects. You will not be able to see whether or not the email has attachments (only the sender, subject, and content will be included), but there may be textual indicators suggesting potential risk.
`;

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

async function sendMessage(event) {
  event.preventDefault();

  const senderInput = document.querySelector(".sender-input-box").value;
  const subjectInput = document.querySelector(".subject-input-box").value;
  const contentInput = document.querySelector(".content-input-box").value;
  const outputDiv = document.querySelector(".output");

  if (contentInput.length) {
    try {
      outputDiv.style.display = "block";
      outputDiv.innerHTML = '<div class="loading">Analyzing email...</div>';

      const fullMessage = `
                Sender: ${senderInput || "Not provided"}
                Subject: ${subjectInput || "Not provided"}
                Content: ${contentInput}
            `;

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
          API_KEY
      );
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = async function () {
        outputDiv.innerHTML = "";
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log("API Response:", data);
          if (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content
          ) {
            const responseText = data.candidates[0].content.parts[0].text;
            outputDiv.insertAdjacentHTML(
              "beforeend",
              `
                            <div class="model">
                                <p>${responseText}</p>
                            </div>
                        `
            );

            // Check if the sender is malicious and if not, add to blacklist
            if (await checkIfMalicious(senderInput)) {
              outputDiv.insertAdjacentHTML(
                "beforeend",
                `
                                <div class="model">
                                    <p>Warning: This sender has been flagged as malicious.</p>
                                </div>
                            `
              );
            } else {
              await addToBlacklist(senderInput); // Add sender to blacklist
            }
          }
        } else {
          console.error("Error Response:", xhr.responseText);
          throw new Error("Request failed. Status: " + xhr.status);
        }
      };

      xhr.onerror = function () {
        console.error("Network Error:", xhr.responseText);
        throw new Error("Request failed");
      };

      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: businessInfo + "\n\nAnalyze this email:\n" + fullMessage,
              },
            ],
          },
        ],
      };

      console.log("Sending request:", requestBody);
      xhr.send(JSON.stringify(requestBody));

      document.querySelector(".content-input-box").value = "";
      document.querySelector(".subject-input-box").value = "";
      document.querySelector(".sender-input-box").value = "";
    } catch (error) {
      console.error("Error:", error);
      outputDiv.innerHTML = `
                <div class="error">
                    <p>The message could not be sent. Please try again. Error: ${error.message}</p>
                </div>
            `;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", sendMessage);
});
