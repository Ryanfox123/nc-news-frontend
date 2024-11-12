GIVEN a user is on /articles/38 and clicks LOGIN
THEN on a successful login, it redirects user back to /articles/38

We need a way to "remember" the last page they were on
OR
The login pages knows

When you click login: redirects to /login

INSTEAD

redirect to /login?rtn=http://website.com/article/38

ON the page, when you do the check and if it's successful, check if there is rtn query param, if there is redirect there, if not redirect ot "/"
