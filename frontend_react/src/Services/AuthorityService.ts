import authorities from '../config/Authorities';
import { Authority } from '../types/models/Authority.model';
import { Role } from '../types/models/Role.model';

const authoritySet = new Set<authorities>();

const AuthorityService = {
  initAuthoritySet: (
    user = JSON.parse(localStorage.getItem('user') || '{}')
  ) => {
    const roles = user && user.roles ? user.roles : [];
    roles.forEach((role: Role) => {
      role.authorities.forEach((authority: Authority) => {
        authoritySet.add(authority.name);
      });
    });
  },
  hasAuthority: (authority: authorities) => {
    AuthorityService.initAuthoritySet();

    return authoritySet.has(authority);
  },
  clearAuthorities: (): void => {
    authoritySet.clear();
  },
};

export default AuthorityService;
