
-- 2.
SELECT COUNT(DISTINCT ur.id_user) AS 'Active Licensees With Address Info'
FROM condor_labs.User_role ur
	INNER JOIN condor_labs.User_address ua ON ur.id_user = ua.id_user -- Users with address information
WHERE ur.id_user > 0 AND ur.in_status = 1 -- Active Users
	AND ur.cd_role_type IN ("LICENSEE", "LIMITED")
;
