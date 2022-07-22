# followup-sender

This module helps send follow-ups from a Gmail client.

## Usage

1. Configure your [Gmail account](https://myaccount.google.com/) to accept less secure apps in the Security section.
2. Create your `.env` file and insert there the contents of `.env.example` file to set your Gmail account email and password.
3. Install all the dependencies by running `yarn install`.
4. Put emails under EMAIL column and website names under WEBSITE column in `followups.xlsx` file.
5. Update your follow-up email as required in `utils/followups`.
6. Run `yarn start [follow-up number]` providing the follow-up number.
