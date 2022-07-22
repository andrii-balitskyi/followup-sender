# followup-sender

This module helps send follow-ups from a Gmail client.

## Usage

1. Configure your [Gmail account](https://myaccount.google.com/) to accept less secure apps in the Security section.
2. Create your `.env` file and insert there the contents of `.env.example` file to set your Gmail account email and password.
3. Install all the dependencies by running `yarn install`.
4. Put emails under EMAIL column and website names under WEBSITE column in `followups.xlsx` file.
5. In `utils/followups` update your follow-up email bodies as necessary.
6. Run `yarn start [follow-up number]` providing the follow-up number e.g. `yarn start 1`.
