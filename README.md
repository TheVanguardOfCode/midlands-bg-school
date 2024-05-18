# Midlands-Bg-School

 ---- How to Fork&Clone the Repo ----

---

1 On the GitHub page for this repository, click on the button "Fork".

2 Clone your forked repository to your computer with SSH so you don't use your pass all the time.
    For example, run this command inside your terminal:
```bash
    git clone git@github.com:<your-github-username>/midlands-bg-school.git
```
Replace <your-github-username>!

3 Move to project directory.
```bash
    cd <project/directory>
```
4 Before you make any changes, keep your fork in sync to avoid merge conflicts.
```bash
    git remote add upstream git@github.com:TheVanguardOfCode/midlands-bg-school.git
    git pull upstream main
```

5 After adding the upstream and checking that all files are up to date, we now will create new branch before editing any files. There are two ways to do so:
```bash
    git checkout -b <branch-name>
```

```bash
    git branch <branch-name>
    git switch <branch-name>
```

6 On your computer, open your text editor, and add your name to the README.md file.
```bash
    -[@M<your-github-username>](https://github.com/<your-github-username>/)
```

7 Add the changes with git add, git commit (write a good commit message, if possible).
```bash
    git add README.md
    git commit -m "your-message>"
```

8 Push your changes to your repository.
```bash
    git push origin <branch-name>
```

9 Go to the GitHub page of your fork, and make a pull request.
---

### Contributors

-[@MiroslavPopovich](https://github.com/MiroslavPopovich/)
-[@VentsislavKostadinov](https://github.com/VentsislavKostadinov)
-[@xelaz98](https://github.com/xelaz98/)
