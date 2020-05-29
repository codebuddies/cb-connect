## CB Connect

### What it is

CodeBuddies' mission is to help connect people who can _help each other_ become better at software development. So far we've built an open-sourced platform that allows people to schedule remote code pairing sessions, feel less alone/be productive in a 24/7 silent coworking hangout, etc. MOST of the activity in the community occurs on Slack, where people post questions -- sometimes technical, sometimes career-related.

**The problem:**

Many people are intimidated by Slack, and too shy to post.

Or they join, see that a channel they're interested in looks quiet (because we're on the Slack free plan, and messages get archived quickly), feel discouraged and leave. Or they don't see the post someone shared a while back about a project they're looking for.

**The solution:**

CB Connect is meant to help the quiet people, who are totally looking for:
a) that accountability or pair programming partner
b) a one-time mentor willing to meet up for an hour
c) an opportunity to teach/mentor someone else
... but don't know the right place to post on Slack, and aren't the sort of natural leaders who think nothing of organizing their own study group on CodeBuddies, or are fearless about posting their questions on Slack or scheduling a hangout on codebuddies.org/hangouts.

Open Canvas: [https://docs.google.com/presentation/d/1QjVW5UPnyfCQaLCvM-Lqne87a1xYsHS763UEK6D5pTQ/edit#slide=id.p](https://docs.google.com/presentation/d/1QjVW5UPnyfCQaLCvM-Lqne87a1xYsHS763UEK6D5pTQ/edit#slide=id.p)

### Roadmap

## Milestone 1

- Users can sign up and register an account by submitting an entry
- Entries are filtered and displayed on individual columns
- Users can "request" other entries
- Moderators can see which users requested other entries
- Moderators can click on two entries and "match" them, triggering an automated email to the creators of both entries
- Moderators see a list of all past matches
- Users can accept or deny a match
- Users can "flag" a user, meaning they will never be matched with entries submitted by that other user.
- Moderators can see a list of top flagged users.

## The specs document

[https://docs.google.com/document/d/1N8cYiQC9g8rheZzI37Eo2iKghC6C3oKZ069Ttv6H61o/edit](https://docs.google.com/document/d/1N8cYiQC9g8rheZzI37Eo2iKghC6C3oKZ069Ttv6H61o/edit)

## How to contribute

0. Join Discord at https://discord.gg/yvtBmEW and ask any questions in the #cb-connect-questions channel.
1. Fork this repository and download your copy with `git clone [YOUR_PATH]`. You can also request to be added as a collaborator.
1. Install meteor: https://www.meteor.com/install
1. Before you start up the app, make sure to `meteor npm install`.
1. Start the app with the following command: `meteor --settings dev-settings.json`

Tips:

- If you need help or would like to pair on an issue, join our Discord at https://discord.gg/yvtBmEW ask!
- When you have localhost:3000 running, type control-m to see the local data available on the page.

Feel free to file new issues. We're looking for design, UX, and code (any: React, Javascript, Meteor, MongoDB) help.

If you see an issue under the `help wanted` category that you'd like to tackle, please comment that you're working on it, and create a new branch for the issue.

Once the prototype is launched, we'll also need volunteer moderators/matchers.

Please submit new pull requests against the `staging` branch.

### How to login on localhost

After you create a new user by submitting an entry, you'll be able to log in by typing in the email you used to apply, and "password" for the password.

If you want to get the verification email, please create an API key in Sparkpost and put it into line 14 in dev-settings.json.

#### How to deploy to production

- ssh into DO server
- cd into `repos/cb-connect`
- pull the latest changes `git pull`
- cd into `repos/cb-connect/scripts/` and run `./build.sh`
  this will create a bundle file inside `/cb-connect/bundles`
- When `./build.sh` script will run successfully, it will output the deploy command like: `./deploy.sh XYZ` where XYZ is the commit hash.
- Copy and run the deploy command, it will deploy the bundle. In case of emergencies or failed deployment you can rollback the last release by running `./deploy.sh` script with previous hash.
- Logs are available inside `/cb-connect/logs/`
