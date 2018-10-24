import hello from './hello';

async function main() {
  const result = await hello();
  document.getElementById('root').textContent = result;
}

main();
