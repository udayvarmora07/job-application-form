window.addEventListener("DOMContentLoaded", async (e) => {
  // console.log("Timezone: ", Intl.DateTimeFormat().resolvedOptions().timeZone);
  // console.log("Timezone Name: ", Intl.DateTimeFormat().resolvedOptions().timeZoneName);
  
  const searchParams = new URLSearchParams(window.location.search);
  const jobApplicantId = searchParams.get("id");
  try {
    const response = await fetch(`/applicants/viewData/${jobApplicantId}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Response: ", response);
    const result = await response.json();
    console.log(result.data);
    // console.log("result: ", result);
    if (response.status === 200) {
      Object.keys(result.data).forEach((key) => {
        // console.log("key: ", key);

        for (let i = 0; i < result.data[`${key}`].length; i++) {
          console.log(result.data[`${key}`][i]);

          Object.keys(result.data[`${key}`][i]).forEach((innerKey) => {
            console.log("innerKey: ", innerKey);
            // console.log(document.getElementById(`${innerKey}`).nodeName);
            
            if (innerKey == "job_application_id") {
              return;
            } else if (
              document.getElementById(`${innerKey}`).nodeName == "SELECT"
            ) {
                console.log("inside select else-if");
                
              const option = document.createElement("option");
              option.value = result.data[`${key}`][i][`${innerKey}`];
              option.label = result.data[`${key}`][i][`${innerKey}`];
              option.selected = "true"
              document.getElementById(`${innerKey}`).appendChild(option)
            } else {
              document.getElementById(`${innerKey}`).value =
                result.data[`${key}`][i][`${innerKey}`];
            }
          });
        }
      });
    } else {
    }
  } catch (error) {}
});
