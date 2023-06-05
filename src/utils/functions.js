// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

const verPerm = (perm, auth) => {
  // console.log('verPerm1', auth?.user?.classes);
  // console.log('verPerm2', perm);
  return perm.some((p) => auth?.user?.classes?.some((c) => c.type === p));
};

const textNormalize = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/.*[/\\]/, '');
};

export { verPerm, textNormalize };
