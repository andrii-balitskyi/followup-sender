export const getFourthFollowup = () => {
  const followupSubject = "Goodbye for now";
  const followupBody = `
    <body>
      <span style="opacity: 0"></span>
      <p>Hello,</p>

      <p>Thank you for your time and patience with my follow-up emails. I was truly looking forward to working with you, but since I have not yet received a reply, it's time to clean up the CRM.</p>

      <p>In case you missed my previous emails, here is a summary:</p>
      <ul style="list-style-type:disc">
        <li>We are interested to become a programmatic partner of your website</li>
        <li>We provide Video, Display and GoStory Player Ads</li>
        <li>This is the <a href="https://www.pixfuture.com/request-publisher-approval-268745/" target="_blank">form to get started</a> if you would like to test</li>
      </ul>
      <p>
        If still interested, please let me know by replying to this email with a follow-up date so I can check back by then.
      </p>

      <p>Once again, thank you, and hope you have a great week ahead!</p>

      <p>Best Regards,</p>
      <table style="margin-top: 10px; margin-bottom: 30px; width: 95%; border: 0">
        <tr height="45">
          <td width="40">
            <img
              src="cid:logo"
              alt="PixFuture"
              width="140"
              height="40"
            />
          </td>
          <td>
            <span
              style="
                font-family: 'Trebuchet MS', helvetica, San-Serif;
                font-size: 12px;
                color: #888888;
                line-height: 22px;
              "
              ><b style="color: #888888">Andrii Balitskyi</b>&nbsp;/&nbsp;Lead
              Generation Manager&nbsp;/&nbsp;<a
                href="http://www.pixfuture.com"
                title="visit PixFuture"
                style="
                  text-decoration: none;
                  border-bottom: 1px dotted #888888;
                  color: #888888;
                "
                >www.pixfuture.com</a
              ></span
            ><br />
            <span
              style="
                font-family: 'Trebuchet MS', helvetica, San-Serif;
                font-size: 11px;
                color: #b2b2b2;
              "
              >7191 Yonge St, Suite 812, Toronto,
              Canada&nbsp;&nbsp;|&nbsp;&nbsp;+1.888.757.9997&nbsp;|&nbsp;&nbsp;<a
                href="mailto:a.balitskyi@pixfuture.com"
                title="email Andrii"
                style="
                  text-decoration: none;
                  border-bottom: 1px dotted #b2b2b2;
                  color: #b2b2b2;
                "
                >a.balitskyi@pixfuture.com</a
              >&nbsp;&nbsp;|&nbsp;&nbsp;<a
                href="https://join.skype.com/invite/zP6bcu5GHIJK"
                title="Skype Andrii"
                style="
                  text-decoration: none;
                  border-bottom: 1px dotted #b2b2b2;
                  color: #b2b2b2;
                "
                >Skype:a.balitskyi&nbsp;&nbsp;</span
            >
          </td>
        </tr>
      </table>
      <span
        style="
          font-family: 'Trebuchet MS', helvetica, San-Serif;
          font-size: 12px;
          color: #888888;
          line-height: 22px;
        "
        >News:
        <a
          href="https://www.pixfuture.com/blog/we-are-in-top-100-online-traffic-properties-in-us-by-quantcast/"
          target="_blank"
          >PixFuture in the Top 100 US online traffic properties</a
        ></span
      >
      <span style="opacity: 0"></span>
    </body>
  `;

  return {
    subject: followupSubject,
    body: followupBody,
  };
};

export default getFourthFollowup;
