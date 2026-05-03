<template>
	<div p-25px>
		<div class="wrap grid relative">
			<p w-50% font-500 m-auto text-center>
				Datos anuales desde 2021 hasta 2025. Las cantidades es la suma de esos valores en las empresa Pionera, Rosita, Corporación la Pionera, y la página web.
			</p>
			<div m-auto mt-10px font-600 w-70%>
				<p><u>Tablas:</u></p>
			</div>
			<div class="grid grid-rows-7 grid-flow-col w-70% m-auto text-12px text-slate-8">
				<p><span border border-slate-5 py-3px px-6px rounded-999>1</span>.- Venta total en quetzales: estación, agencia, voucher y página</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>2</span>.- Todos los boletos. Válidos y no válidos</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>3</span>.- Total reasignaciones</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>4</span>.- Reasignaciones de estación</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>5</span>.- Reasignados de agencias</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>6</span>.- Reasignados de la página</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>7</span>.- Boletos válidos en: estación, agencia, vouchers, página.</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>8</span>.- Válidos en estación</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>9</span>.- Válidos voucher</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>10</span>.- Válidos en agencia</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>11</span>.- Válidos en página</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>12</span>.- Total de cortesias y anulados</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>13</span>.- Cortesias</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>14</span>.- Anulados en estación</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>15</span>.- Anulados en agencias</p>
				<p><span border border-slate-5 py-3px px-6px rounded-999>16</span>.- Anulados de la página</p>
			</div>

			<div grid absolute right-70px bottom-10px text-10px!>
				<div flex items-center font-550 pl-20px mb-5px>
					<b><u>Iconos leyenda:</u></b>
				</div>
				<div flex items-center h-15px>
					<icon name="arrow_drop_up" class="left-0 text-green-8 font-400 text-20px" />
					<div>Sube con <span font-740>respecto al año anterior</span></div>
				</div>
				<div flex items-center h-15px>
					<icon name="arrow_drop_down" class="left-0 text-red-7 font-500 text-20px" />
					<div>Baja con <span font-640>respecto al año anterior</span></div>
				</div>
				<div flex items-center h-15px>
					<icon name="add" class="left-0 text-green-8 font-300 text-20px" />
					<div>Cuanto subió <span font-640>respecto al año anterior</span></div>
				</div>
				<div flex items-center h-15px>
					<icon name="check_indeterminate_small" class="left-0 text-red-7 font-300 text-20px" />
					<div>Cuanto bajó <span font-640>respecto al año anterior</span></div>
				</div>
			</div>
		</div>

		<div v-for="(categorie, index3) in categories">
			<!-- <div border-b border-slate-4 my-25px w-70% mx-auto></div> -->
			<q-list bordered class="rounded-borders my-15px">
				<q-expansion-item expand-separator>
					<template #header>
						<div w-full flex items-center text-lg font-500>- {{ header[index3] }}</div>
					</template>
					<div class="flex test wrap">
						<div class="border border-slate-5 m-8px inline-block w-fit" v-for="(cat, index) in categorie">
							<div relative>
								<div absolute top-50% h-10px! min-w-10px! border border-slate-6 rounded-9999px text-14px py-10px! px-5px! -mt-10px right-10px font-400>
									{{ cat[1] }}
								</div>
								<div class="cat" pl-10px! text-14px py-10px text-slate-8 bg-slate-2 border-b border-slate-3 font-600 v-html="cat[0]"></div>
							</div>
							<div flex py-0px font-600 h-40px>
								<div pl-15px>Año</div>
								<div pl-25px!>Cant.</div>
								<div pl-20px!>Dif.</div>
							</div>
							<div v-for="(year, index2) in years" flex border-b border-slate-3 py-0px>
								<div>{{ year }}</div>
								<!-- <div>{{ fnumber(data[index3][index][index2]) }}</div> -->
								<div relative>
									<icon
										v-if="index2 && data[index3][index][index2] - data[index3][index][index2 - 1] > 0"
										name="arrow_drop_up"
										class="left-0 text-green-8 font-400 text-24px absolute"
									/>
									<icon v-else-if="index2" name="arrow_drop_down" class="left-0 text-red-7 font-500 text-24px absolute" />
									<span v-if="index3 == 0 && index == 0" class="ml-10px">Q {{ fnumber(data[index3][index][index2]) }}</span>
									<span v-else class="ml-10px">{{ fnumber(data[index3][index][index2]) }}</span>
								</div>
								<div relative>
									<icon v-if="index2 && data[index3][index][index2] - data[index3][index][index2 - 1] > 0" name="add" class="left-0 text-green-8 font-400 text-16px absolute" />
									<icon v-else-if="index2" name="check_indeterminate_small" class="left-0 text-red-7 font-500 text-16px absolute" />
									<span v-if="index3 == 0 && index == 0" class="ml-5px">Q {{ getDiff(index3, index, index2) }}</span>
									<span v-else class="ml-5px">{{ getDiff(index3, index, index2) }}</span>
								</div>
							</div>
						</div>
					</div>
				</q-expansion-item>
			</q-list>
		</div>
	</div>
</template>
<style lang="scss">
	.wrap {
		width: 1100px;
		margin: auto;
	}
	div.test > div {
		// padding: 25px;
		padding-top: 0px;
		padding-left: 0px;
		width: 330px;

		& > div {
			color: $surface-8;
			font-size: 14px;
			// background-color: #f8fafc;
			& > div {
				padding: 15px;
				height: 40px;
				display: flex;
				align-items: center;
				&:nth-child(1) {
					min-width: 50px;
				}
				&:nth-child(2) {
					min-width: 120px;
				}
			}
		}
	}
	.cat span {
		font-size: 12px;
	}
</style>

<script setup>
	const header = ['Totales de las ventas y boletos', 'Reasignaciones', 'Boletos Facturados', 'Boletos sin Cobrar o Anulados']
	function fnumber(n) {
		return new Intl.NumberFormat('es-ES').format(n) // "1.2M"
	}
	function getDiff(i3, i, i2) {
		if (i2 == 0) {
			return fnumber(data[i3][i][i2]) // "1.2M"
		} else {
			let diff = data[i3][i][i2] - data[i3][i][i2 - 1]
			return fnumber(Math.abs(diff)) // "1.2M"

			return Math.abs(diff)
		}
	}
	// let categories = [
	// ["venta", "Venta en (Q)"],
	// ["totales", "Total de boletos vendidos"],
	// ["validos", "Validos: No incluye anulados ni reasignados"],
	// ["invalidos", "Invalidos: la suma de los anulados y reasignados"],
	// ["reasignados", "Reasignados"],
	// ["anulados", "Anulados"],
	// ];
	let categories = [
		[
			['- Venta facturada', 1],
			['- Boletos Facturados y sin Cobrar', 2],
		],
		[
			['- Total', 3],
			['- Estación', 4],
			['- Agencia', 5],
			['- Página', 6],
		],
		[
			['- Total', 7],
			['- Estación', 8],
			['- Agencia', 9],
			['- Vouchers', 10],
			['- Página', 11],
		],
		[
			['- Total', 12],
			['- Cortesias', 13],
			['- Estación anulados', 14],
			['- Agencia anulados', 15],
			['- Página anulados', 16],
		],
	]
	let count = 0

	let v = [17764060, 31738966, 35463101, 36554780, 30607823]
	let t = [79180, 143209, 158565, 165357, 144481]
	let tf = [77157, 136831, 153861, 160723, 138886]
	let tfe = [75187, 130469, 142555, 147871, 126116]
	let tfv = [167, 8330, 2855, 17551, 11675]
	let tfa = [1970, 6362, 10607, 12852, 12770]
	let tfp = [0, 0, 2501, 7835, 11098]
	let nf = [861, 3885, 2768, 2515, 2730]
	let nfc = [489, 2497, 1409, 1759, 2096]
	let nfa = [372, 1388, 1359, 756, 634]
	let nfaga = [44, 360, 578, 508, 569]
	let nfpa = [0, 0, 8, 3, 18]
	let br = [1044, 2285, 1809, 1981, 2644]
	let bre = [993, 2095, 1620, 1854, 2422]
	let bra = [41, 167, 151, 117, 202]
	let brp = [0, 0, 60, 136, 389]

	let v2 = [40560010, 85232760, 98280524, 124309951, 102217961]
	let t2 = [245468, 558828, 634993, 716769, 675473]
	let tf2 = [231010, 526261, 585616, 666344, 639809]
	let tfe2 = [228916, 519265, 562432, 655317, 629224]
	let tfv2 = [24039, 121869, 109432, 158314, 120089]
	let tfa2 = [2094, 6996, 22538, 11027, 10585]
	let tfp2 = [0, 0, 2229, 6630, 8854]
	let nf2 = [10388, 24961, 43277, 39764, 23678]
	let nfc2 = [9590, 23286, 41293, 38644, 23087]
	let nfa2 = [798, 1675, 1984, 112, , 591]
	let nfaga2 = [51, 475, 531, 504, 527]
	let nfpa2 = [0, 0, 14, 5, 12]
	let br2 = [3750, 7676, 6632, 10592, 12213]
	let bre2 = [3605, 7084, 5398, 9454, 11391]
	let bra2 = [40, 148, 179, 98, 75]
	let brp2 = [0, 0, 42, 108, 171]

	let years = [2021, 2022, 2023, 2024, 2025]
	// let data = [v, t, tf, tfe, tfa, tfp, nf, nfr, nfa, nfc];
	let data = [
		[v, t],
		[br, bre, bra, brp],
		[tf, tfe, tfv, tfa, tfp],
		[nf, nfc, nfa, nfaga, nfpa],
	]
</script>
