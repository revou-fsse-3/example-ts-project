// TypeScript code
// import Swal from 'sweetalert2';

const userMenuButton = document.querySelector<HTMLElement>("#user-menu-button");
const userMenu = document.querySelector<HTMLElement>("#user-menu");

if (userMenuButton && userMenu) {
  userMenuButton.addEventListener("click", function () {
    userMenu.classList.toggle("hidden");
  });
}
const mobileMenuButton = document.querySelector<HTMLElement>(
  '[aria-controls="mobile-menu"]'
);
const mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove("open");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form") as HTMLFormElement;
  const commentTextarea = document.getElementById(
    "comment"
  ) as HTMLTextAreaElement;
  const commentContainer = document.getElementById(
    "comment-container"
  ) as HTMLDivElement;



  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const donation = document.getElementById("donation") as HTMLInputElement;
    const donationValue: string = donation.value;
    // const paymentMethod = document.getElementById("payment") as HTMLInputElement;
    const mediaShare = document.getElementById("media-share") as HTMLInputElement;
    const mediaShareValue: string = mediaShare.value;

    const userName = document.getElementById("username") as HTMLInputElement;
    const userNameValue: string = userName.value;

    const userComment: string = commentTextarea.value;
    commentTextarea.value = "";
    const userCommentTime = new Date();
    function formatCommentTime(commentTime: Date): string {
      const now = new Date();

      if (isSameDate(now, commentTime)) {
        return `Today, ${commentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      } else {
        return commentTime.toLocaleString();
      }
    }

    function isSameDate(date1: Date, date2: Date): boolean {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }

    const formattedTime = formatCommentTime(userCommentTime);
    const commentElement = document.createElement("div");
    commentElement.classList.add("flex", "space-x-2", "py-3");
    const userIcon = document.createElement("i");
    userIcon.classList.add(
      "flex-none",
      "text-xl",
      "rounded-full",
      "fas",
      "fa-user"
    );
    const chatBubble = document.createElement("div");
    chatBubble.classList.add(
      "flex-auto",
      "bg-blue-700",
      "text-white",
      "p-2",
      "py-2",
      "rounded-lg",
      "shadow-md",
      "border",
      "border-gray-200",
      "rounded-lg",
      "dark:bg-gray-700",
      "dark:border-gray-600"
    );

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${getVideoId(mediaShareValue)}`;
    iframe.width = "560";
    iframe.height = "315";
    iframe.allowFullscreen = true;

    function getVideoId(url: any) {
      const regex = /(?:[?&]v=|\/embed\/|\/\d{1,2}\/|\/youtu.be\/|\/v\/|\/e\/|watch\?v=)([^&\n?#]+)/;
      const match = url.match(regex);
      return match && match[1];
    }

    const commentText = document.createElement("p");
    commentText.classList.add("p-3", "px-2", "py-4");
    commentText.innerHTML = `${userComment}<br>`;
    commentText.appendChild(iframe);

    const commentTime = document.createElement("p");
    commentTime.classList.add("text-xs", "text-gray-300");
    commentTime.innerText = formattedTime;

    const userNameElement = document.createElement("span");
    userNameElement.textContent = userNameValue;
    userNameElement.classList.add("font-bold", "mb-1");

    const donateElement = document.createElement("span");
    donateElement.textContent = `Donate ${donationValue}`;
    donateElement.classList.add("font-bold", "mb-1");

    chatBubble.appendChild(userNameElement);
    chatBubble.appendChild(commentTime);
    chatBubble.appendChild(donateElement);
    chatBubble.appendChild(commentText);

    commentElement.appendChild(userIcon);
    commentElement.appendChild(chatBubble);

    commentContainer.appendChild(commentElement);
  });
});
