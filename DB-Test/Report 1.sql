-- 1. 
SELECT ur.cd_role_type AS 'User Type'
	, COUNT(DISTINCT up.id_user) AS 'Total Active'
    , SUM(CASE WHEN up.nm_middle IS NULL THEN 1 ELSE 0 END) AS 'No Middle Name'
FROM User_Profile up
	INNER JOIN (
		SELECT DISTINCT ur.cd_role_type
			, ur.id_user 
		FROM User_role ur 
        WHERE ur.id_user > 0 AND ur.in_status = 1 -- Active Users
	) AS ur ON ur.id_user = up.id_user
GROUP BY ur.cd_role_type
;


-- This is another way to do the query, using a CTE instead of a subquery.
/*WITH wtActiveUsers AS (
	SELECT DISTINCT ur.cd_role_type
		, ur.id_user
	FROM User_role ur
    WHERE ur.id_user > 0 AND ur.in_status = 1 -- Active Users
) SELECT wt.cd_role_type AS 'User Type'
	, COUNT(DISTINCT up.id_user) AS 'Total Active'
    , SUM(CASE WHEN up.nm_middle IS NULL THEN 1 ELSE 0 END) AS 'No Middle Name'
FROM wtActiveUsers wt
	INNER JOIN User_Profile up ON wt.id_user = up.id_user
GROUP BY wt.cd_role_type
;*/