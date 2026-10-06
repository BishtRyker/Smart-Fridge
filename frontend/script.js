// State Management
let temperature = 4.2;
let isDoorOpen = false;

let inventory = [
  { id: 1, name: 'Milk', quantity: 2, status: 'Fresh', category: 'Dairy' },
  { id: 2, name: 'Apples', quantity: 5, status: 'Fresh', category: 'Produce' },
  { id: 3, name: 'Eggs', quantity: 8, status: 'Fresh', category: 'Poultry' },
  { id: 4, name: 'Bread', quantity: 1, status: 'Expiring soon', category: 'Bakery' },
];

let shoppingList = [
  { id: 101, name: 'Milk', checked: false },
  { id: 102, name: 'Bread', checked: false }
];

// Clock Update
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  const clockEl = document.getElementById('liveClock');
  const dateEl = document.getElementById('liveDate');
  if (clockEl) clockEl.textContent = timeStr;
  if (dateEl) dateEl.textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock();

// Notification Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  msg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

// Temperature Adjuster
function adjustTemp(delta) {
  temperature = parseFloat((temperature + delta).toFixed(1));
  if (temperature < 1.0) temperature = 1.0;
  if (temperature > 8.0) temperature = 8.0;
  document.getElementById('tempDisplay').innerHTML = `${temperature.toFixed(1)} °C`;
}

// Door Toggle Simulation
function toggleDoor() {
  isDoorOpen = !isDoorOpen;
  const card = document.getElementById('doorCard');
  const text = document.getElementById('doorStatusText');
  const subtext = document.getElementById('doorSubtext');
  const icon = document.getElementById('doorIcon');
  const btn = document.getElementById('doorToggleBtn');

  if (isDoorOpen) {
    card.classList.add('border-rose-500/60', 'bg-rose-950/20');
    text.textContent = 'OPEN';
    text.className = 'text-2xl font-bold font-mono tracking-wider text-rose-400 uppercase animate-pulse';
    subtext.innerHTML = ' Alert: Internal temperature rising';
    subtext.className = 'mt-2 text-[11px] text-rose-400 font-mono flex items-center gap-1';
    icon.className = 'w-4 h-4 text-rose-400';
    btn.textContent = 'Simulate Close';
    btn.classList.add('border-rose-500/50', 'text-rose-200');
    showToast('⚠️ Door has been opened!');
  } else {
    card.classList.remove('border-rose-500/60', 'bg-rose-950/20');
    text.textContent = 'CLOSED';
    text.className = 'text-2xl font-bold font-mono tracking-wider text-emerald-400 uppercase';
    subtext.innerHTML = ' Seal secure & airtight';
    subtext.className = 'mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1';
    icon.className = 'w-4 h-4 text-emerald-400';
    btn.textContent = 'Simulate Open';
    btn.classList.remove('border-rose-500/50', 'text-rose-200');
    showToast('✅ Door closed securely');
  }
  lucide.createIcons();
}

