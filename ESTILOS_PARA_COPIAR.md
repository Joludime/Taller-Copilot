# 🎨 ESTILOS ADICIONALES PARA COPIAR Y PEGAR

## ⚠️ IMPORTANTE: Copia TODO este código al FINAL del archivo `styles.css`

Abre el archivo `styles.css` en GitHub, ve al final (después de la última llave `}`) y pega todo este código:

```css

/* ===== SECCIÓN FOTO DE PERFIL EN HERO ===== */
.hero-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    max-width: 1000px;
}

.hero-text {
    flex: 1;
    text-align: left;
}

.hero-image {
    flex-shrink: 0;
}

.profile-img {
    width: clamp(200px, 25vw, 300px);
    height: clamp(200px, 25vw, 300px);
    border-radius: 50%;
    object-fit: cover;
    border: 6px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: fadeInRight 0.8s ease 0.3s backwards;
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* ===== SECCIÓN ESTADÍSTICAS ===== */
.stats {
    padding: clamp(40px, 8vw, 60px) 0;
    background: white;
    border-bottom: 1px solid var(--border-color);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(150px, 100%, 200px), 1fr));
    gap: clamp(1.5rem, 3vw, 2rem);
    max-width: 900px;
    margin: 0 auto;
}

.stat-card {
    text-align: center;
    padding: clamp(1.5rem, 2vw, 2rem);
    background: var(--light-gray);
    border-radius: 12px;
    transition: var(--transition);
    border-top: 4px solid transparent;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    border-top-color: var(--accent-color);
}

.stat-number {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: clamp(0.85rem, 1vw, 0.95rem);
    color: var(--text-light);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* ===== SECCIÓN CERTIFICACIONES ===== */
.certifications {
    padding: clamp(60px, 10vw, 100px) 0;
    background: white;
}

.section-intro {
    text-align: center;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto 3rem;
}

.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 100%, 280px), 1fr));
    gap: clamp(1.5rem, 2vw, 2rem);
    margin-top: clamp(2rem, 4vw, 3rem);
}

.cert-card {
    background: var(--light-gray);
    padding: clamp(1.5rem, 2.5vw, 2rem);
    border-radius: 12px;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
}

.cert-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.cert-card:hover::before {
    transform: scaleX(1);
}

.cert-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-color);
}

.cert-icon {
    font-size: clamp(2.5rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
    filter: grayscale(20%);
    transition: var(--transition);
}

.cert-card:hover .cert-icon {
    transform: scale(1.1);
    filter: grayscale(0%);
}

.cert-card h3 {
    color: var(--primary-color);
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    margin: 0;
    font-weight: 700;
}

.cert-card p {
    color: var(--text-light);
    font-size: clamp(0.85rem, 1vw, 0.9rem);
    margin: 0;
    line-height: 1.5;
}

/* ===== MEJORAS ADICIONALES ===== */
.project-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--accent-color);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: var(--transition);
}

.project-link:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.footer-links {
    margin-top: 1rem;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
}

.footer-links a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s;
}

.footer-links a:hover {
    opacity: 1;
}

/* ===== RESPONSIVE PARA NUEVAS SECCIONES ===== */
@media (max-width: 768px) {
    .hero-content {
        flex-direction: column-reverse;
        text-align: center;
    }

    .hero-text {
        text-align: center;
    }

    .profile-img {
        width: clamp(150px, 20vw, 200px);
        height: clamp(150px, 20vw, 200px);
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .certifications-grid {
        grid-template-columns: 1fr;
    }

    .project-links {
        flex-direction: column;
    }

    .project-link {
        text-align: center;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .stat-number {
        font-size: 2rem;
    }

    .profile-img {
        width: 150px;
        height: 150px;
    }

    .cert-card {
        padding: 1.25rem;
    }

    .cert-icon {
        font-size: 2rem;
    }
}

/* ===== TEMA OSCURO PARA NUEVAS SECCIONES ===== */
@media (prefers-color-scheme: dark) {
    .stats {
        background: #0f172a;
        border-bottom-color: #374151;
    }

    .certifications {
        background: #0f172a;
    }

    .cert-card {
        background: #1f2937;
    }

    .stat-card {
        background: #1f2937;
    }
}
```

## 📝 Pasos para Agregar los Estilos:

1. Ve a: https://github.com/Joludime/Jose-Luis-Diaz-Portafolio/blob/main/styles.css
2. Click en el ícono del ✏️ (lápiz) para editar
3. **Desplázate hasta el FINAL del archivo**
4. Copia TODO el código CSS de arriba (desde `/* ===== SECCIÓN FOTO DE PERFIL...` hasta el final)
5. Pégalo al final del archivo
6. Click en "Commit changes"
7. Escribe: "Agregar estilos para certificaciones, estadísticas y foto de perfil"
8. Click en "Commit changes"

## ✅ ¿Cómo Verificar que Funciona?

Una vez que hagas commit:
1. Espera 1-2 minutos
2. Ve a: https://joludime.github.io/Jose-Luis-Diaz-Portafolio/
3. Refresca la página (Ctrl + F5 o Cmd + Shift + R)
4. Deberías ver:
   - Tu foto de perfil en el Hero
   - 4 tarjetas de estadísticas
   - 9 certificaciones con iconos

---

**¡Ya casi terminas! Solo falta este último paso.** 🚀
