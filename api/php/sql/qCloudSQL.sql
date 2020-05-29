



select *
from mock_users;


select * into mock_users_copy
from mock_users;

create table mock_users_copy as
select *
from mock_users;

INSERT INTO mock_users_copy
SELECT *
FROM mock_users;
# WHERE entry_date < '2011-01-01 00:00:00';





#