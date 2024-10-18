document.addEventListener("DOMContentLoaded", () => {
    const exerciseList = document.getElementById("exercise-list");
    const searchInput = document.getElementById("search");
    const filterLanguage = document.getElementById("filter-language");
    const editor = document.getElementById("editor");
    const exerciseTitle = document.getElementById("exercise-title");
    const exerciseDescription = document.getElementById("exercise-description");
    const codeInput = document.getElementById("code");
    const runCodeButton = document.getElementById("run-code");
    const clearCodeButton = document.getElementById("clear-code");
    const submitCodeButton = document.getElementById("submit-code");
    const testResults = document.getElementById("test-results");

    // Danh sách bài tập mẫu
    const exercises = [
        { title: "Bài tập 1: Tính tổng", description: "Tính tổng hai số.", language: "C", difficulty: "Dễ", timeLimit: "30 phút", score: 10 },
        { title: "Bài tập 2: Sắp xếp mảng", description: "Sắp xếp một mảng số.", language: "Python", difficulty: "Trung bình", timeLimit: "1 giờ", score: 20 },
        { title: "Bài tập 3: Tìm số nguyên tố", description: "Kiểm tra một số có phải là số nguyên tố.", language: "Java", difficulty: "Khó", timeLimit: "45 phút", score: 15 },
        // Thêm nhiều bài tập ở đây
    ];

    // Hiển thị danh sách bài tập
    function displayExercises() {
        exerciseList.innerHTML = "";
        exercises.forEach(exercise => {
            const exerciseDiv = document.createElement("div");
            exerciseDiv.className = "exercise";
            exerciseDiv.innerHTML = `
                <h3>${exercise.title}</h3>
                <p>${exercise.description}</p>
                <p>Mức độ khó: ${exercise.difficulty}</p>
                <p>Thời gian: ${exercise.timeLimit}</p>
                <p>Điểm: ${exercise.score}</p>
            `;
            exerciseDiv.addEventListener("click", () => {
                openEditor(exercise);
            });
            exerciseList.appendChild(exerciseDiv);
        });
    }

    // Mở editor với thông tin bài tập
    function openEditor(exercise) {
        exerciseTitle.innerText = exercise.title;
        exerciseDescription.innerText = exercise.description;
        codeInput.value = ""; // Xóa mã trước đó
        editor.style.display = "block";
        testResults.innerHTML = ""; // Xóa kết quả trước đó
    }

    // Chạy mã (cần gọi API ở đây)
    runCodeButton.addEventListener("click", () => {
        const code = codeInput.value;
        console.log("Chạy mã:", code);
        // Thêm mã gọi API để chạy mã ở đây
        // Hiển thị kết quả kiểm tra
        testResults.innerHTML = "<p>Kết quả kiểm tra: Thành công!</p>"; // Thay thế bằng kết quả thực tế
    });

    // Xóa mã
    clearCodeButton.addEventListener("click", () => {
        codeInput.value = "";
        testResults.innerHTML = "";
    });

    // Nộp mã (cần gọi API ở đây)
    submitCodeButton.addEventListener("click", () => {
        const code = codeInput.value;
        console.log("Nộp mã:", code);
        // Thêm mã gọi API để nộp mã ở đây
    });

    // Tìm kiếm và lọc bài tập
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filteredExercises = exercises.filter(exercise => exercise.title.toLowerCase().includes(keyword));
        displayFilteredExercises(filteredExercises);
    });

    filterLanguage.addEventListener("change", () => {
        const language = filterLanguage.value;
        const filteredExercises = exercises.filter(exercise => !language || exercise.language === language);
        displayFilteredExercises(filteredExercises);
    });

    function displayFilteredExercises(filteredExercises) {
        exerciseList.innerHTML = "";
        filteredExercises.forEach(exercise => {
            const exerciseDiv = document.createElement("div");
            exerciseDiv.className = "exercise";
            exerciseDiv.innerHTML = `
                <h3>${exercise.title}</h3>
                <p>${exercise.description}</p>
                <p>Mức độ khó: ${exercise.difficulty}</p>
                <p>Thời gian: ${exercise.timeLimit}</p>
                <p>Điểm: ${exercise.score}</p>
            `;
            exerciseDiv.addEventListener("click", () => {
                openEditor(exercise);
            });
            exerciseList.appendChild(exerciseDiv);
        });
    }

    // Hiển thị danh sách bài tập lần đầu
    displayExercises();
});

// Các biến chọn phần tử
let login = document.querySelector(".login");
let create = document.querySelector(".create");
let container = document.querySelector(".container");
let loginButton = document.querySelector('.signin input[type="submit"]');
let signupButton = document.querySelector('.signup input[type="submit"]');
let forgotPasswordLink = document.querySelector('.forgot-password');

let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng từ localStorage

// Chuyển đổi giữa đăng ký và đăng nhập
login.onclick = function() {
  container.classList.add("signinForm");
};
create.onclick = function() {
  container.classList.remove("signinForm");
};

// Hàm để xác thực người dùng
const authenticateUser = (usernameOrEmail, password) => {
    return users.find(user => 
        (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
    );
};

// Thêm sự kiện cho nút đăng ký
signupButton.onclick = function(event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();

    if (!username || !email || !password || !confirmPassword) {
        showMessage("Vui lòng điền đầy đủ thông tin.", false);
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Mật khẩu không khớp.", false);
        return;
    }

    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        showMessage("Tên người dùng hoặc email đã tồn tại.", false);
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Tài khoản đã được tạo! Bạn có thể đăng nhập ngay.", true);
    container.classList.remove("signinForm"); // Quay về form đăng nhập
};

// Thêm sự kiện cho nút đăng nhập
loginButton.onclick = function(event) {
    event.preventDefault(); // Ngăn chặn gửi biểu mẫu
    const usernameOrEmail = document.getElementById("login-username-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // Kiểm tra thông tin đăng nhập
    if (!usernameOrEmail || !password) {
        alert("Vui lòng nhập tên người dùng/email và mật khẩu.");
        return;
    }

    const user = authenticateUser(usernameOrEmail, password);

    if (user) {
        // Chuyển đến trang dashboard.html
        window.location.href = 'dashboard.html';
    } else {
        alert("Tên người dùng hoặc mật khẩu không đúng!"); // Thông báo lỗi
    }
};

// Thêm sự kiện cho liên kết "Quên mật khẩu"
forgotPasswordLink.onclick = function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định
    const usernameOrEmail = prompt("Nhập tên người dùng hoặc email đã đăng ký:");

    if (!usernameOrEmail) {
        alert("Vui lòng nhập thông tin!");
        return;
    }

    const user = users.find(user => user.username === usernameOrEmail || user.email === usernameOrEmail);

    if (user) {
        // Giả sử gửi email để đặt lại mật khẩu
        alert(`Một liên kết đặt lại mật khẩu đã được gửi đến ${user.email}.`);
    } else {
        alert("Không tìm thấy tài khoản với thông tin đã nhập.");
    }
};



