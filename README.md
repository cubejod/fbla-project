# FBLA Coding and Programming 2023-2024

---

# Partner Information System

Prerequisites:
1. Docker
2. Docker Compose

>Note: Our choice would be to install Docker Desktop and docker-compose to do the heavy lifting for you. However, it can be done manually.

To start:
1. Obtain code (through github or through other means)
2. run `docker compose -f dev.compose.yml build`
3. run `docker compose -f dev.compose.yml up`
4. navigate to `http://localhost:3000/partners`
5. Import the default admin user (required to add partners):
- Go to the terminal of `next-app` in docker desktop
- run `node ./setup/redis.js -a`
- or just run `docker exec -it next-app node ./setup/redis.js -a`
6. Import the default partners by running the same command with `-p` instaed of `-a`
7. All done

>Note: from here on out in documentation the address will be refered to as `PIS` (partner information system). For example, the partners home page will be `PIS/partners`

Partners page: `PIS/partners`

Admin page: `PIS/admin`

Debug page: `PIS/debug`

# Use

To use `Partner Information System` navigate to `http://localhost:3000/partners`

To add partners navigate to `http://localhost:3000/admin`, login with username `admin@localhost` and password `password` (the default username and password) and press new

To edit partners go to the same page and press edit

To delete partners do the same and press delete

