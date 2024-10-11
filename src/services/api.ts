export const fetchSkf = async (skfCode: string, jwt: string | null) => {
  const response = await fetch(
    `https://api2.skafis.com/view/problem/${skfCode}`,
    {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
    }
  );
  const data = await response.json();
  let toAdd = '';

  if (data.problemVisibility === 'VISIBLE') {
    toAdd = data.problemText;
  } else if (data.problemVisibility === 'HIDDEN') {
    toAdd = `❗Užduotis "${skfCode}" yra paslėpta. Norėdami matyti užduotį, turite prisijungti arba pakeisti paskyrą.❗`;
  } else {
    toAdd = `❗Užduotis "${skfCode}" neegzistuoja arba įvyko kita klaida.❗`;
  }
  return { toAdd, visibility: data.problemVisibility };
};
