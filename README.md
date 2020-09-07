# GTag Opt In
> Google Analytics Opt In

## Goal
The library's goal is to facilitate using an opt-in approach of cookies with Google Analytics. 

## What's opt-in?
Traditionally, GA will be enabled by default and at a later point it can be disabled.
The issue is that user is not able to intentionally opt-in but rather needs to explicit opt-out whereas tracking has already happened.

Example:
 1. User visits website
 2. Website start tracking user
 3. It renders an opt-out option
 4. User clicks on opt-out
 5. Now, it disables tracking.
 
By using an opt-in approach, GA is disabled by default and if user wants to enable it at a later point then he can do so.

 1. User visits website
 2. Website start tracking user
 3. It renders an opt-in option
 4. User clicks on opt-in
 5. Now, it enables tracking.

Since Google Tag doesn't support opt-in out of the box, the library will help to achieve this user-focused UX.

## How to use it?
gtag-opt-in requires two things:
 - Google Tag library
 - Cookie banner library

On one side Google Analytics must be working and on the other a banner library to show the opt-in option to the user.
GTag Opt In will act as the middle man between these two.
After rendering of cookie banner and user clicking opt-in, the library will enable Google Analytics.

