// ============================================
// Math & CS Hub — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============ 1. Hamburger Menu ============
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    }

    // ============ 2. Courses Page Filter ============
    const coursesGrid = document.getElementById('coursesGrid');
    if (coursesGrid) {
        const semFilter = document.getElementById('filterSemester');
        const majorFilter = document.getElementById('filterMajor');
        const searchFilter = document.getElementById('filterSearch');
        const noResults = document.getElementById('noResults');
        const cards = coursesGrid.querySelectorAll('.course-card');

        // دعم الروابط اللي جاية من الصفحة الرئيسية (?sem=3 أو ?major=cs)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('sem') && semFilter) semFilter.value = urlParams.get('sem');
        if (urlParams.has('major') && majorFilter) majorFilter.value = urlParams.get('major');

        function filterCourses() {
            const semVal = semFilter ? semFilter.value : '';
            const majorVal = majorFilter ? majorFilter.value : '';
            const searchVal = searchFilter ? searchFilter.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            cards.forEach(card => {
                const cardSem = card.getAttribute('data-sem');
                const cardMajor = card.getAttribute('data-major');
                const cardText = card.querySelector('h3').textContent.toLowerCase();

                const matchSem = !semVal || cardSem === semVal;
                const matchMajor = !majorVal || cardMajor === majorVal;
                const matchSearch = !searchVal || cardText.includes(searchVal);

                if (matchSem && matchMajor && matchSearch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResults) {
                if (visibleCount === 0) noResults.classList.add('show');
                else noResults.classList.remove('show');
            }
        }

        if (semFilter) semFilter.addEventListener('change', filterCourses);
        if (majorFilter) majorFilter.addEventListener('change', filterCourses);
        if (searchFilter) searchFilter.addEventListener('input', filterCourses);
        
        filterCourses(); // تشغيل الفلتر لو فيه بيانات جاية من الرابط
    }

    // ============ 3. Videos & Books Filter ============
    const videosGrid = document.getElementById('videosGrid');
    const booksGrid = document.getElementById('booksGrid');

    function setupCategoryFilter(gridId, cardSelector) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const categoryFilter = document.getElementById('filterCategory');
        const searchFilter = document.getElementById('filterSearch');
        const noResults = document.getElementById('noResults');
        const cards = grid.querySelectorAll(cardSelector);

        function filterItems() {
            const catVal = categoryFilter ? categoryFilter.value : '';
            const searchVal = searchFilter ? searchFilter.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                const cardText = card.querySelector('h3').textContent.toLowerCase();

                const matchCat = !catVal || cardCat === catVal;
                const matchSearch = !searchVal || cardText.includes(searchVal);

                if (matchCat && matchSearch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResults) {
                if (visibleCount === 0) noResults.classList.add('show');
                else noResults.classList.remove('show');
            }
        }

        if (categoryFilter) categoryFilter.addEventListener('change', filterItems);
        if (searchFilter) searchFilter.addEventListener('input', filterItems);
    }

    setupCategoryFilter('videosGrid', '.video-card');
    setupCategoryFilter('booksGrid', '.book-card');

    // ============ 4. Search Page Filter ============
    const resultsGrid = document.getElementById('resultsGrid');
    if (resultsGrid) {
        const typeFilter = document.getElementById('filterType');
        const searchInput = document.getElementById('searchInput');
        const noResults = document.getElementById('noResults');
        const cards = resultsGrid.querySelectorAll('.result-card');

        function filterResults() {
            const typeVal = typeFilter ? typeFilter.value : '';
            const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                const cardText = card.querySelector('h3').textContent.toLowerCase();

                const matchType = !typeVal || cardType === typeVal;
                const matchSearch = !searchVal || cardText.includes(searchVal);

                if (matchType && matchSearch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResults) {
                if (visibleCount === 0) noResults.classList.add('show');
                else noResults.classList.remove('show');
            }
        }

        if (typeFilter) typeFilter.addEventListener('change', filterResults);
        if (searchInput) searchInput.addEventListener('input', filterResults);
    }

    // ============ 5. Course Page Tabs ============
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // إزالة active من الكل
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // إضافة active للعنصر اللي اتضغط عليه
                this.classList.add('active');
                const targetId = this.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

});
