
-- 3.
SELECT COUNT(DISTINCT uR.id_user) AS 'Non-active Providers'
FROM condor_labs.User_role ur
WHERE (uR.id_user <= 0 OR ur.in_status <> 1) -- Inactive Users
	AND ur.cd_role_type = "PROVIDER"
;
