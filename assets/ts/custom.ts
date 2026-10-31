// 自定义点击动效：
// 1. 卡片 / 按钮上的水波纹（ink ripple）
// 2. 页面任意点击处的「颜料点」飞溅（配色取自国画颜料：
//    花青、朱砂、藤黄、石绿、紫藤）

const PALETTE = ['#c03b33', '#4a6b5a', '#c9930b', '#2f4b7c', '#6b4f9e'];

function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** 在被点击元素内部生成一圈扩散的水波纹 */
function spawnRipple(host: HTMLElement, e: MouseEvent): void {
    const rect = host.getBoundingClientRect();
    // 按钮用自身尺寸，大卡片封顶 160px，避免糊满整个卡片
    const size = Math.min(Math.max(rect.width, rect.height), 160);
    const ripple = document.createElement('span');
    ripple.className = 'ink-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}

/** 在点击处溅出几粒颜料点 */
function spawnInkDots(x: number, y: number): void {
    const count = 6;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = 'ink-dot';
        const size = 4 + Math.random() * 4;
        dot.style.width = dot.style.height = `${size}px`;
        dot.style.left = `${x - size / 2}px`;
        dot.style.top = `${y - size / 2}px`;
        dot.style.background = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        dot.style.opacity = '0.85';
        document.body.appendChild(dot);

        const angle = Math.random() * Math.PI * 2;
        const distance = 18 + Math.random() * 32;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance + 8; // 略微下坠，更像颜料滴落

        dot.animate(
            [
                { transform: 'translate(0, 0) scale(1)', opacity: 0.85 },
                {
                    transform: `translate(${dx}px, ${dy}px) scale(0.2)`,
                    opacity: 0,
                },
            ],
            {
                duration: 450 + Math.random() * 250,
                easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
            },
        ).addEventListener('finish', () => dot.remove());
    }
}

function setupClickEffects(): void {
    if (prefersReducedMotion()) return;

    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // 输入框里点击不打扰
        if (target.closest('input, textarea')) return;

        // 水波纹：卡片和按钮
        const host = target.closest<HTMLElement>('.article-list article, button');
        if (host) spawnRipple(host, e);

        // 颜料飞溅
        spawnInkDots(e.clientX, e.clientY);
    });
}

window.addEventListener('load', () => {
    setTimeout(setupClickEffects, 0);
});

export {};
