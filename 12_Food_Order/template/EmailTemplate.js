export const WelComeEmailTemplate = (userName) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to RoyalBite</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#F5F1E8;
  font-family:Arial, Helvetica, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#F5F1E8; padding:40px 0;">

    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="
            max-width:600px;
            width:100%;
            background:#FFFFFF;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(20, 12, 40, 0.15);
          ">

          <!-- Royal Header -->
          <tr>
            <td align="center"
              style="
                background:#160B2E;
                padding:40px 30px;
                border-bottom:4px solid #D4AF37;
              ">

              <div style="
                font-size:42px;
                margin-bottom:10px;
              ">
                👑
              </div>

              <h1 style="
                margin:0;
                color:#D4AF37;
                font-size:36px;
                letter-spacing:1px;
              ">
                RoyalBite
              </h1>

              <p style="
                margin:10px 0 0;
                color:#E8D9A8;
                font-size:14px;
                letter-spacing:1px;
              ">
                WHERE EVERY BITE FEELS ROYAL
              </p>

            </td>
          </tr>

          <!-- Welcome Section -->
          <tr>
            <td style="padding:45px 40px 35px;">

              <h2 style="
                margin:0 0 18px;
                color:#160B2E;
                font-size:27px;
              ">
                Welcome, ${userName}! 👋
              </h2>

              <p style="
                margin:0 0 18px;
                color:#555555;
                font-size:16px;
                line-height:1.7;
              ">
                We're delighted to welcome you to
                <strong style="color:#7B2CBF;">RoyalBite</strong>.
              </p>

              <p style="
                margin:0 0 25px;
                color:#555555;
                font-size:16px;
                line-height:1.7;
              ">
                Your account has been successfully created.
                Get ready to discover delicious food, explore amazing
                restaurants, and enjoy a truly royal dining experience.
              </p>

              <!-- Gold Divider -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    height:1px;
                    background:#D4AF37;
                    opacity:0.5;
                  ">
                  </td>
                </tr>
              </table>

              <br />

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center"
                    style="
                      background:#7B2CBF;
                      border-radius:8px;
                      border:2px solid #D4AF37;
                    ">

                    <a href="{{loginUrl}}"
                      style="
                        display:inline-block;
                        padding:14px 32px;
                        color:#FFFFFF;
                        text-decoration:none;
                        font-size:16px;
                        font-weight:bold;
                        letter-spacing:0.5px;
                      ">
                      Explore RoyalBite 🍽️
                    </a>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Features -->
          <tr>
            <td style="
              background:#F8F4EC;
              padding:30px 40px;
              border-top:1px solid #E5D7B0;
              border-bottom:1px solid #E5D7B0;
            ">

              <h3 style="
                margin:0 0 22px;
                color:#160B2E;
                font-size:20px;
              ">
                ✨ Your Royal Experience
              </h3>

              <p style="
                margin:12px 0;
                color:#444444;
                font-size:14px;
              ">
                🍽️ &nbsp; Discover delicious meals
              </p>

              <p style="
                margin:12px 0;
                color:#444444;
                font-size:14px;
              ">
                🛒 &nbsp; Order your favorite food
              </p>

              <p style="
                margin:12px 0;
                color:#444444;
                font-size:14px;
              ">
                🚀 &nbsp; Enjoy fast and easy ordering
              </p>

              <p style="
                margin:12px 0;
                color:#444444;
                font-size:14px;
              ">
                ❤️ &nbsp; Save your favorite dishes
              </p>

            </td>
          </tr>

          <!-- Royal Quote -->
          <tr>
            <td align="center" style="
              background:#160B2E;
              padding:30px 35px;
            ">

              <p style="
                margin:0;
                color:#D4AF37;
                font-size:18px;
                font-style:italic;
                line-height:1.6;
              ">
                "Great food deserves a royal experience."
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="
              background:#0D071C;
              padding:25px;
            ">

              <p style="
                margin:0 0 8px;
                color:#FFFFFF;
                font-size:14px;
                font-weight:bold;
              ">
                👑 RoyalBite
              </p>

              <p style="
                margin:0;
                color:#9E94A8;
                font-size:12px;
              ">
                © 2026 RoyalBite. All rights reserved.
              </p>

              <p style="
                margin:10px 0 0;
                color:#9E94A8;
                font-size:12px;
              ">
                Delicious food. Premium experience.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>`
}