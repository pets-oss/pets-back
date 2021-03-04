import { QueryConfig } from 'pg';
import { select } from 'sql-bricks-postgres';

const getUserRolesQuery = (user_id: string): QueryConfig =>
    select('organization_id', 'role_type')
        .from('app_user_roles')
        .where({ user_id })
        .toParams();

export default getUserRolesQuery;
