const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const profilePicture = document.getElementById("profilePicture");
const path = window.location.pathname;

if(path == "/login") {
  const token = localStorage.getItem("token")
  if(token) {
    window.location.href = "/applicants/list"
  } else {
    window.location.href = "/login";
  }
}

signUpForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signUpForm);

  // const data = {};
  // signUpForm.childNodes.forEach((value) => {
  //   if (value.nodeName == "INPUT") {
  //     if (value.type == "submit") {
  //       return;
  //     }
  //     data[value.name] = document.getElementById(`${value.name}`).value;
  //   }
  // });

  // try {
  //   const result = await fetch("/sign-up", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   // console.log("response: ", result);
  //   if (result.ok) {
  //     window.location.href = `${await result.text()}`;
  //   }
  // } catch (error) {
  //   console.log(error);
  //   throw error;
  // }

  try {
    const result = await fetch("/sign-up", {
      method: "POST",
      body: formData,
    });
    console.log("Result: ", result);
    if (result.status === 200) {
      window.location.href = "/login";
    } else {
      const error = await result.json();
      console.log("Error: ", error);
      if (!error.errors) {
        const element = document.createElement("label");
        element.setAttribute("id", `${error.field}Error`);
        element.style.color = "red";
        element.style.width = "220px";
        element.innerHTML = `${error.message}`;
        const previosElement = document.getElementById("profilePicture");
        previosElement.parentNode.insertBefore(
          element,
          previosElement.nextSibling
        );
      } else {
        error.errors.forEach((error) => {
          console.log("Field: ", error.field);
          console.log("Message: ", error.message);

          const element = document.createElement("label");
          element.setAttribute("id", `${error.field}Error`);
          element.style.color = "red";
          element.style.width = "220px";
          element.innerHTML = `${error.message}`;
          if (error.field == "mimetype") {
            const previosElement = document.getElementById("profilePicture");
            previosElement.parentNode.insertBefore(
              element,
              previosElement.nextSibling
            );
          } else if(error.field == "size") {
              const previosElement = document.getElementById("profilePicture");
              previosElement.parentNode.insertBefore(
                element,
                previosElement.nextSibling
              );
          }
           else {
            const previosElement = document.getElementById(`${error.field}`);
            previosElement.parentNode.insertBefore(
              element,
              previosElement.nextSibling
            );
          }
        });
      }
    }

    // const response = await result.json();
    // if (response.data.success) {
    //   window.location.href = "/login";
    // } else if (response.data.error) {
    //   const error = response.data.error;
    //   console.log("Error: ", error);

    //   error.forEach((error) => {
    //     console.log("Field: ", error.field);
    //     console.log("Message: ", error.message);

    //     const element = document.createElement("label");
    //     element.setAttribute("id", `${error.field}Error`);
    //     (element.style.color = "red"), (element.style.width = "220px");
    //     element.innerHTML = `${error.message}`;
    //     const previosElement = document.getElementById(`${error.field}`);
    //     previosElement.parentNode.insertBefore(
    //       element,
    //       previosElement.nextSibling
    //     );
    //   });
    // }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

loginForm?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const data = {};
    loginForm.childNodes.forEach((value) => {
      if (value.nodeName == "INPUT") {
        if (value.type == "submit") {
          return;
        }
        data[value.name] = document.getElementById(`${value.name}`).value;
      }
    });
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Result: ", result);

    if (response.status === 200) {
      const token = result.data;
      localStorage.setItem("token", token);
      try {
        window.location.href = "/applicants/list"
        // const response = await fetch("/applicants/list", {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        // const result = await response.json();
        // if (response.status === 200) {
        //   console.log("----------------");

        //   window.location.href = "/applicants/listPage";
        // } else {
        //   throw new Error(result.message);
        // }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    } else {
      // const error = await result.json();
      // console.log("Error: ", error);
      const error = result;
      if (!error.errors) {
        const element = document.createElement("label");
        element.setAttribute("id", `${error.field}Error`);
        element.style.color = "red";
        element.style.width = "220px";
        element.innerHTML = `${error.message}`;
        const previosElement = document.getElementById("profilePicture");
        previosElement.parentNode.insertBefore(
          element,
          previosElement.nextSibling
        );
      } else {
        error.errors.forEach((error) => {
          console.log("Field: ", error.field);
          console.log("Message: ", error.message);

          const element = document.createElement("label");
          element.setAttribute("id", `${error.field}Error`);
          element.style.color = "red";
          element.style.width = "220px";
          element.innerHTML = `${error.message}`;
          if (error.field == "mimetype") {
            const previosElement = document.getElementById("profilePicture");
            previosElement.parentNode.insertBefore(
              element,
              previosElement.nextSibling
            );
          } else {
            const previosElement = document.getElementById(`${error.field}`);
            previosElement.parentNode.insertBefore(
              element,
              previosElement.nextSibling
            );
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  // const formData = new FormData(loginForm);

  // try {
  //   const response = await fetch("/login", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   console.log(response);

  //   // if(resoponse)
  // } catch (error) {
  //   console.log(error);
  //   throw error;
  // }
});

profilePicture?.addEventListener("change", (e) => {
  let fileReader = new FileReader();
  // console.log(profilePicture.files[0]);
  // if (
  //   profilePicture.files[0].type !== "image/png" ||
  //   profilePicture.files[0].type !== "image/jpg" ||
  //   profilePicture.files[0].type !== "image/jpeg"
  // ) {
  //   profilePicture.value = "";
  //   document.getElementById("imageValidation").innerHTML =
  //     "Select image-png,jpeg,jpg format...";
  //   document.getElementById("signUpSubmit").style.pointerEvents = "none";
  //   document.getElementById("signUpSubmit").style.opacity = "0.5";
  // } else {
  //   document.getElementById("imageValidation").innerHTML = "";
  //   document.getElementById("signUpSubmit").style.pointerEvents = "fill";
  //   document.getElementById("signUpSubmit").style.opacity = "1";
  //   document.getElementById("signUpSubmit").style.cursor = "pointer";
  fileReader.readAsDataURL(profilePicture.files[0]);
  fileReader.onloadend = (e) => {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = "Profile Image";
    document.getElementById("imgDiv").replaceChildren(img);
  };
  // }
});
