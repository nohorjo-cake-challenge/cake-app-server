import { ICake } from 'cake-common';

const apiServerBaseUrl = process.env.REACT_APP_API_SERVER || 'http://localhost:3001';

export function getAllCakes(): Promise<ICake[]> {
  return _fetch('all').then(r => r.json());
}

export function deleteCake(id: ICake['id']): Promise<Response> {
  return _fetch(String(id), {method: 'DELETE'});
}

export function addCake(cake: Omit<ICake, 'id'>): Promise<Response> {
  return _fetch('new', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(cake),
  });
}

function _fetch(path: string, opts?: RequestInit): ReturnType<typeof fetch> {
  return fetch(`${apiServerBaseUrl}/${path}`, opts).then(r => {
    if (!r.ok) {
      throw r;
    }

    return r;
  })
}
