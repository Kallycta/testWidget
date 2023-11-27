import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_CONFIRM_ACCOUNT: EmailTemplateType = {
    title: `Convolo account confirmation`,
    html: `<!DOCTYPE html>
<html>

<head>

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 9 - 26 can be safely removed. -->


  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href='https://fonts.googleapis.com/css?family=Roboto:400,500' rel='stylesheet' type='text/css'> 
  <style type="text/css">
    /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */


    /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%;
      /* 1 */
      -webkit-text-size-adjust: 100%;
      /* 2 */
    }

    /**
   * Remove extra space added to tables and cells in Outlook.
   */
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }

    /**
   * Better fluid images in Internet Explorer.
   */
    img {
      -ms-interpolation-mode: bicubic;
    }

    /**
   * Remove blue links for iOS devices.
   */
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }

    /**
   * Fix centering issues in Android 4.4.
   */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }

    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    /**
   * Collapse table borders to avoid space between cells.
   */
    table {
      border-collapse: collapse !important;
    }

    a {
      color: #1a82e2;
    }

    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
    .footer-small{
        display: none;
    }
    @media screen and (max-width:600px) {
    .footer-small {
        display: table;
    }
    .footer-big {
        display: none;
    }
    .header{
        margin-left: 10px;
    }
}

  </style>

</head>

<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader"
    style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    Please confirm your account.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="header">
          <tr>
            <td align="start" valign="top" style="padding: 90px 0 27px;">
              <img width="135px" src="https://app.convolo.ai/static/mail_logo.png" alt="Logo" border="0"  width="292" height="76">
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="start" bgcolor="#ffffff"
              style="padding: 36px 30px 0; font-family: Roboto;">
              <h1 style="margin-bottom: 35px; font-size: 30px; font-weight: 500; line-height: 35px;">Please confirm your account</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="start" bgcolor="#ffffff"
              style="padding: 0 30px 15px; font-family: Roboto; font-size: 16px; line-height: 21px; font-weight: 400;">
              <p style="margin: 0;">Hi there,</p>
            </td>
          </tr>
          <tr>
            <td align="start" bgcolor="#ffffff"
              style="padding: 0 30px 15px; font-family: Roboto; font-size: 16px; line-height: 21px; font-weight: 400;">
              <p style="margin: 0;">Thank you for making an account with Convolo.</p>
            </td>
          </tr>
          <tr>
            <td align="start" bgcolor="#ffffff"
              style="padding: 0 30px 15px; font-family: Roboto; font-size: 16px; line-height: 21px; font-weight: 400;">
              <p style="margin: 0;">You can <span> <a style="font-family: Roboto; font-size: 16px; line-height: 21px; font-weight: 400;" href="{emailVerification}" target="_blank"> confirm your email</a> </span>by clicking below:</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" margin-left="">
                      <tr>
                        <td align="center" bgcolor="#0074ff" style="border-radius: 8px;" >
                          <a href="{emailVerification}" target="_blank"
                            style="display: inline-block; padding: 16px 36px; font-family: Roboto; font-size: 20px; color: #ffffff; text-decoration: none; font-weight: 500;">Confirm my email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff"
              style="padding: 0 30px 30px; font-family: Roboto; font-size: 16px; line-height: 20px; font-style: italic; font-weight: 400;">
              <p style="margin: 0;">--<br> The Convolo Team</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="footer-big">
          <tr>
            <td align="start" bgcolor="#e9ecef"
              style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;">
              <p style="margin: 0;">© Copyright by Convolo - All Rights Reserved</p>
            </td>
            <td align="end" bgcolor="#e9ecef"
                style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;">
                <p style="margin: 0;">Terms of use</p>
            </td>
            <td align="end" bgcolor="#e9ecef"
                style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;">
                <p style="margin: 0;">Cookies</p>
            </td>
            <td align="end" bgcolor="#e9ecef"
                style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;">
                <p style="margin: 0;">Privacy Policy</p>
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="footer-small">
            <tr>
                <td align="center">
                    <span style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6; margin: 0 9px;">Terms of use</span>
                    <span style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;  margin: 0 9px;">Cookies</span>
                    <span style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;  margin: 0 9px;">Privacy Policy</span>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <p style="font-family: Roboto; font-size: 12px; line-height: 20px; color: #a6a6a6;">© Copyright by Convolo - All Rights Reserved</p>
                </td>
            </tr>
          </table>

      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>

</html>`,
};
