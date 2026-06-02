<script setup>
const { data: response } = await useFetch('/api/classes')

const activeTag = ref('Tous')
const tags = ['Tous', 'Force', 'Post-Entraînement', 'Réalignement']

const activeSecondaryFilter = ref(null)
const selectedMethod = ref('Tous')
const selectedMyofascialLine = ref('Tous')

const availableMethods = computed(() => {
	const classesList = response.value?.data || []
	const methodsSet = new Set()

	classesList.forEach(yogaClass => {
		if (yogaClass.method && yogaClass.method.trim()) {
			methodsSet.add(yogaClass.method.trim())
		}
	})

	return ['Tous', ...Array.from(methodsSet)]
})

const availableMyofascialLines = computed(() => {
	const classesList = response.value?.data || []
	const linesSet = new Set()

	classesList.forEach(yogaClass => {
		if (!yogaClass.myofascial_lines) return

		if (Array.isArray(yogaClass.myofascial_lines)) {
			yogaClass.myofascial_lines.forEach(line => linesSet.add(line.trim()))
		} else if (typeof yogaClass.myofascial_lines === 'string') {
			yogaClass.myofascial_lines.split(',').forEach(line => {
				if (line.trim()) linesSet.add(line.trim())
			})
		}
	})

	return ['Tous', ...Array.from(linesSet)]
})

const filteredClasses = computed(() => {
	let classesList = response.value?.data || []

	if (activeTag.value !== 'Tous') {
		classesList = classesList.filter(yogaClass => yogaClass.tag === activeTag.value)
	}

	if (selectedMethod.value !== 'Tous') {
		classesList = classesList.filter(yogaClass => yogaClass.method === selectedMethod.value)
	}

	if (selectedMyofascialLine.value !== 'Tous') {
		classesList = classesList.filter(yogaClass => {
			if (!yogaClass.myofascial_lines) return false

			if (Array.isArray(yogaClass.myofascial_lines)) {
				return yogaClass.myofascial_lines.map(l => l.trim()).includes(selectedMyofascialLine.value)
			} else if (typeof yogaClass.myofascial_lines === 'string') {
				return yogaClass.myofascial_lines.split(',').map(l => l.trim()).includes(selectedMyofascialLine.value)
			}
			return false
		})
	}

	return classesList
})

const toggleSecondaryFilter = (filterType) => {
	if (activeSecondaryFilter.value === filterType) {
		activeSecondaryFilter.value = null
	} else {
		activeSecondaryFilter.value = filterType
	}
}
</script>

<template>
	<div class="classes-page">
		<div class="container">

			<header class="page-header">
				<div class="header-main">
					<BackButton to="/" text="Retour" />
					<h1 class="page-title">Classes En Ligne</h1>
					<p class="intro-text">
						Des séries immersives conçues pour développer la force, la mobilité active et l'équilibre structurel.
						Choisir la séquence adaptée aux objectifs du jour et maximiser le potentiel physique.
					</p>
				</div>

				<div class="filter-controls">
					<nav class="filter-navigation" aria-label="Catégories de cours">
						<button v-for="tag in tags" :key="tag" class="filter-tab" :class="{ active: activeTag === tag }"
							@click="activeTag = tag">
							<span class="tab-label">{{ tag }}</span>
							<span class="tab-indicator"></span>
						</button>
					</nav>

					<div class="secondary-buttons-group">
						<button class="secondary-filter-btn"
							:class="{ 'btn-active': activeSecondaryFilter === 'method' || selectedMethod !== 'Tous' }"
							@click="toggleSecondaryFilter('method')">
							<span>Méthodes</span>
							<span v-if="selectedMethod !== 'Tous'" class="active-dot"></span>
						</button>

						<button class="secondary-filter-btn"
							:class="{ 'btn-active': activeSecondaryFilter === 'myofascial' || selectedMyofascialLine !== 'Tous' }"
							@click="toggleSecondaryFilter('myofascial')">
							<span>Lignes Myofasciales</span>
							<span v-if="selectedMyofascialLine !== 'Tous'" class="active-dot"></span>
						</button>
					</div>
				</div>

				<div class="drawers-container">
					<transition name="drawer-fade">
						<div v-if="activeSecondaryFilter === 'method'" class="filter-drawer">
							<button v-for="method in availableMethods" :key="method" class="filter-pill"
								:class="{ active: selectedMethod === method }" @click="selectedMethod = method">
								{{ method }}
							</button>
						</div>
					</transition>

					<transition name="drawer-fade">
						<div v-if="activeSecondaryFilter === 'myofascial'" class="filter-drawer">
							<button v-for="line in availableMyofascialLines" :key="line" class="filter-pill"
								:class="{ active: selectedMyofascialLine === line }" @click="selectedMyofascialLine = line">
								{{ line }}
							</button>
						</div>
					</transition>
				</div>
			</header>

			<div class="classes-grid" v-if="filteredClasses.length > 0">
				<NuxtLink v-for="yogaClass in filteredClasses" :key="yogaClass.id" :to="`/classes/${yogaClass.slug}`"
					class="class-card-link">
					<article class="class-card">
						<div class="image-container">
							<img :src="yogaClass.image" :alt="yogaClass.title" loading="lazy" />
							<div class="subtle-overlay"></div>
							<span class="floating-tag">{{ yogaClass.tag }}</span>
						</div>

						<div class="class-content">
							<div class="meta-top">
								<span class="class-duration">{{ yogaClass.duration }}</span>
								<span class="meta-dot"></span>
								<span class="class-level">{{ yogaClass.level }}</span>
							</div>
							<h3 class="class-title">{{ yogaClass.title }}</h3>
							<p class="class-collection">Méthode: {{ yogaClass.method || 'Non spécifiée' }}</p>

							<div class="myofascial-container" v-if="yogaClass.myofascial_lines">
								<template v-if="Array.isArray(yogaClass.myofascial_lines)">
									<span v-for="line in yogaClass.myofascial_lines" :key="line" class="myofascial-tag">
										{{ line }}
									</span>
								</template>

								<template
									v-else-if="typeof yogaClass.myofascial_lines === 'string' && yogaClass.myofascial_lines.trim()">
									<span v-for="line in yogaClass.myofascial_lines.split(',')" :key="line" class="myofascial-tag">
										{{ line.trim() }}
									</span>
								</template>
							</div>
						</div>
					</article>
				</NuxtLink>
			</div>

			<div class="empty-state" v-else>
				<p class="empty-message">Aucune pratique ne correspond à cette sélection pour le moment.</p>
			</div>

		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@200;300;400&display=swap');

.classes-page {
	background-color: #111315;
	color: #ffffff;
	min-height: 100vh;
	font-family: 'Montserrat', sans-serif;
	padding-top: 60px;
}

.container {
	max-width: 1300px;
	margin: 0 auto;
	padding: 0 50px 80px 50px;
}

.page-header {
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin-bottom: 40px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.03);
	padding-bottom: 30px;
}

.header-main {
	max-width: 700px;
}

.page-title {
	font-family: 'Cormorant Garamond', serif;
	font-size: 3.5rem;
	font-weight: 300;
	margin: 25px 0 15px 0;
	letter-spacing: -0.5px;
}

.intro-text {
	font-size: 1.05rem;
	line-height: 1.7;
	color: #999999;
	font-weight: 200;
}

.filter-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
}

.filter-navigation {
	display: flex;
	gap: 35px;
	align-items: center;
	overflow-x: auto;
	scrollbar-width: none;
}

.filter-navigation::-webkit-scrollbar {
	display: none;
}

.filter-tab {
	background: transparent;
	border: none;
	color: #666666;
	padding: 10px 0;
	font-family: 'Montserrat', sans-serif;
	font-size: 0.85rem;
	font-weight: 400;
	text-transform: uppercase;
	letter-spacing: 2px;
	cursor: pointer;
	position: relative;
	transition: color 0.4s ease;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.filter-tab:hover {
	color: #ffffff;
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	width: 0;
	height: 1px;
	background-color: #ecda71;
	transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.filter-tab.active {
	color: #ecda71;
}

.filter-tab.active .tab-indicator {
	width: 100%;
}

.secondary-buttons-group {
	display: flex;
	gap: 12px;
}

.secondary-filter-btn {
	background: transparent;
	border: 1px solid rgba(255, 255, 255, 0.15);
	color: #ffffff;
	padding: 8px 16px;
	border-radius: 4px;
	font-family: 'Montserrat', sans-serif;
	font-size: 0.8rem;
	font-weight: 300;
	letter-spacing: 1px;
	text-transform: uppercase;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	transition: all 0.3s ease;
}

.secondary-filter-btn:hover {
	border-color: #ecda71;
	color: #ecda71;
}

.secondary-filter-btn.btn-active {
	border-color: #ecda71;
	background-color: rgba(197, 168, 128, 0.05);
	color: #ecda71;
}

.active-dot {
	width: 6px;
	height: 6px;
	background-color: #ecda71;
	border-radius: 50%;
}

.drawers-container {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
}

.filter-drawer {
	grid-area: 1 / 1 / 2 / 2;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	padding: 20px;
	background-color: #16191d;
	border-radius: 6px;
	border: 1px solid rgba(255, 255, 255, 0.03);
	z-index: 1;
}

.filter-pill {
	background: transparent;
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: #aaaaaa;
	padding: 6px 14px;
	border-radius: 20px;
	font-family: 'Montserrat', sans-serif;
	font-size: 0.75rem;
	font-weight: 300;
	cursor: pointer;
	transition: all 0.2s ease;
}

.filter-pill:hover {
	color: #ffffff;
	border-color: rgba(255, 255, 255, 0.3);
}

.filter-pill.active {
	background-color: #ecda71;
	border-color: #ecda71;
	color: #090a0c;
	font-weight: 400;
}

.classes-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 35px 20px;
}

.class-card-link {
	text-decoration: none;
	color: inherit;
}

.class-card {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #16191d;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.03);
	transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
}

.class-card-link:hover .class-card {
	transform: translateY(-4px);
	border-color: rgba(197, 168, 128, 0.2);
	box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.image-container {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	background-color: #111315;
}

.image-container img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.subtle-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(to top, rgba(22, 25, 29, 0.5) 0%, transparent 60%);
	transition: opacity 0.4s;
}

.floating-tag {
	position: absolute;
	bottom: 12px;
	left: 12px;
	background: rgba(22, 25, 29, 0.85);
	backdrop-filter: blur(4px);
	border: 1px solid rgba(255, 255, 255, 0.06);
	padding: 4px 10px;
	font-size: 0.65rem;
	letter-spacing: 1px;
	text-transform: uppercase;
	color: #cccccc;
	border-radius: 4px;
}

.class-card-link:hover .image-container img {
	transform: scale(1.04);
}

.class-content {
	padding: 20px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.meta-top {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 0.7rem;
	color: #888888;
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 8px;
}

.meta-dot {
	width: 3px;
	height: 3px;
	background-color: #ecda71;
	border-radius: 50%;
}

.class-title {
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.35rem;
	font-weight: 400;
	line-height: 1.3;
	margin: 0 0 6px 0;
	color: #ffffff;
	transition: color 0.3s ease;
}

.class-card-link:hover .class-title {
	color: #ecda71;
}

.class-collection {
	font-size: 0.8rem;
	color: #666666;
	font-weight: 300;
	margin-bottom: 14px;
}

.myofascial-container {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-top: auto;
	padding-top: 14px;
	border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.myofascial-tag {
	font-size: 0.65rem;
	font-weight: 300;
	color: #ecda71;
	background-color: rgba(197, 168, 128, 0.08);
	padding: 3px 8px;
	border-radius: 4px;
	letter-spacing: 0.2px;
	border: 1px solid rgba(197, 168, 128, 0.15);
}

.empty-state {
	text-align: center;
	padding: 80px 0;
}

.empty-message {
	color: #555555;
	font-size: 0.95rem;
	font-weight: 300;
	font-style: italic;
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
	transition: all 0.25s ease-out;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
	opacity: 0;
	transform: translateY(-8px);
}

@media (max-width: 1024px) {
	.classes-grid {
		grid-template-columns: repeat(3, 1fr);
		gap: 25px 20px;
	}

	.page-title {
		font-size: 2.8rem;
	}
}

@media (max-width: 768px) {
	.classes-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px 15px;
	}

	.container {
		padding: 0 20px 40px 20px;
	}

	.page-title {
		font-size: 2.4rem;
	}

	.filter-controls {
		flex-direction: column;
		align-items: flex-start;
	}

	.filter-navigation {
		gap: 20px;
		width: 100%;
	}

	.secondary-buttons-group {
		width: 100%;
		flex-direction: column;
	}

	.secondary-filter-btn {
		width: 100%;
		justify-content: center;
	}
}
</style>