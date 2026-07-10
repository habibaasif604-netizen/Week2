// Document DOM Elements Targeting Selection
const modal = document.getElementById('dashboardModal');
const modalHeader = document.getElementById('modalHeader');
const modalBody = document.getElementById('modalBody');
const pageMainTitle = document.getElementById('pageMainTitle');
const sidebar = document.getElementById('appSidebar');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const modalCloseX = document.getElementById('modalCloseX');

// Initialize Application Core Scripts
document.addEventListener('DOMContentLoaded', () => {
  setupSidebarNavigation();
  setupMobileHamburger();
  setupLocalGreeting();
  setupRowClicks();
  setupWidgetClicks();
  setupProfileBox();
  setupSettingsSave();
});

// FEATURE 1: Mobile Sidebar Hamburger Menu Toggle Action
function setupMobileHamburger() {
  if (!menuToggleBtn) return;
  
  menuToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('sidebar--open');
  });

  // Sidebar se bahar click karne par auto-collapse ho jaye
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && sidebar.classList.contains('sidebar--open')) {
      sidebar.classList.remove('sidebar--open');
    }
  });
}

// FEATURE 2: Read Local Time & Display Dynamic Greetings
function setupLocalGreeting() {
  const greetingBox = document.getElementById('timeGreeting');
  if (!greetingBox) return;

  const currentHour = new Date().getHours();
  let textStr = "Welcome back!";

  if (currentHour < 12) {
    textStr = "☀️ Good Morning, Habiba! Let's build something awesome.";
  } else if (currentHour < 18) {
    textStr = "🌤️ Good Afternoon, Habiba! Auditing active pipelines.";
  } else {
    textStr = "🌙 Good Evening, Habiba! Reviewing session analytics updates.";
  }
  
  greetingBox.innerText = textStr;
}

// Tab Panels Routing Logic
function setupSidebarNavigation() {
  const links = document.querySelectorAll('.sidebar__link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-tab');

      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('tab-content--active'));
      links.forEach(l => l.classList.remove('sidebar__link--active'));

      document.getElementById(targetId).classList.add('tab-content--active');
      link.classList.add('sidebar__link--active');

      // Update Page Main Titles
      if (targetId === 'dashboard-view') pageMainTitle.innerText = "Dashboard Overview";
      if (targetId === 'customers-view') pageMainTitle.innerText = "CRM Customers Database";
      if (targetId === 'analytics-view') pageMainTitle.innerText = "Analytics & Reports Engines";
      if (targetId === 'settings-view') pageMainTitle.innerText = "Application Parameter Settings";

      // Mobile screen par item click hote hi menu close ho jaye
      sidebar.classList.remove('sidebar--open');
    });
  });
}

// Table Logs Row Click Modals
function setupRowClicks() {
  document.querySelectorAll('.activity-table__row').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.getAttribute('data-name');
      const status = row.getAttribute('data-status');
      const date = row.getAttribute('data-date');
      const amount = row.getAttribute('data-amount');
      const details = row.getAttribute('data-details');

      modalHeader.innerText = "Customer Log Profile";
      modalBody.innerHTML = `
        <div style="text-align: left; line-height: 1.8;">
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Pipeline Status:</strong> ${status}</p>
          <p><strong>Logged Date:</strong> ${date}</p>
          <p><strong>Transaction Value:</strong> ${amount}</p>
          <p style="margin-top: 10px; border-top: 1px dashed #e2e8f0; padding-top: 10px; color: #64748b;">
            <strong>Activity Log Summary:</strong><br>${details}
          </p>
        </div>
      `;
      modal.classList.add('modal-overlay--active');
    });
  });
}

// Analytics Widget Box Modal Triggers
function setupWidgetClicks() {
  document.querySelectorAll('.card-widget').forEach(widget => {
    widget.addEventListener('click', () => {
      const metric = widget.getAttribute('data-metric');
      const val = widget.getAttribute('data-value');
      const desc = widget.getAttribute('data-desc');

      modalHeader.innerText = `${metric} Insights`;
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
          <h1 style="font-size: 3rem; color: #2563eb; margin-bottom: 10px;">${val}</h1>
          <p style="color: #64748b;">${desc}</p>
        </div>
      `;
      modal.classList.add('modal-overlay--active');
    });
  });

  // Modal Closers Event Mapping
  if (modalCloseX) modalCloseX.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Clickable Profile Box Triggers
function setupProfileBox() {
  const profileBox = document.getElementById('profileTrigger');
  if (!profileBox) return;

  profileBox.addEventListener('click', () => {
    modalHeader.innerText = "Administrator Credentials";
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 10px 0;">
        <div style="width: 70px; height: 70px; background: #2563eb; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 15px auto; font-size: 24px; font-weight: bold;">HA</div>
        <h3>Habiba Asif</h3>
        <p style="color: #64748b; font-size: 14px; margin-top: 5px;">System Administrator / Software Developer</p>
        <div style="margin-top: 20px; background: #f8fafc; padding: 12px; border-radius: 8px; text-align: left; font-size: 13px; border: 1px solid #e2e8f0;">
          <p><strong>Access Level:</strong> Root Authority Rank</p>
          <p><strong>Status:</strong> Active Session (Online)</p>
        </div>
      </div>
    `;
    modal.classList.add('modal-overlay--active');
  });
}

// Settings Custom Save Action Handler
function setupSettingsSave() {
  const saveBtn = document.getElementById('saveSettingsBtn');
  const toast = document.getElementById('saveToast');
  if (!saveBtn || !toast) return;

  saveBtn.addEventListener('click', () => {
    const emailVal = document.getElementById('adminEmail').value;
    toast.innerText = `🎉 Configuration Saved for ${emailVal}!`;
    toast.classList.add('toast-notification--active');
    
    setTimeout(() => {
      toast.classList.remove('toast-notification--active');
    }, 3500);
  });
}

function closeModal() {
  modal.classList.remove('modal-overlay--active');
}