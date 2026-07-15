import { useState, useMemo, useEffect, Fragment } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Building2,
  Route,
  Droplets,
  HardHat,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileSearch,
  BarChart3,
  Filter,
} from 'lucide-react';

interface DPWHProject {
  contractId: string;
  description: string;
  category: string;
  status: string;
  budget: number;
  amountPaid: number;
  progress: number;
  location: { province: string; region: string };
  contractor: string;
  startDate: string | null;
  completionDate: string | null;
  infraYear: string;
  programName: string;
  sourceOfFunds: string;
}

interface DPWHData {
  fetchedAt: string;
  summary: {
    totalProjects: number;
    completed: number;
    ongoing: number;
    notStarted: number;
    forProcurement: number;
    terminated: number;
    totalBudget: number;
  };
  projects: DPWHProject[];
}

const STATUS_COLORS: Record<string, string> = {
  Completed: 'bg-green-100 text-green-800 border-green-200',
  'On-Going': 'bg-blue-100 text-blue-800 border-blue-200',
  'Not Started': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'For Procurement': 'bg-purple-100 text-purple-800 border-purple-200',
  Terminated: 'bg-red-100 text-red-800 border-red-200',
};

const STATUS_ICONS: Record<string, typeof CheckCircle2> = {
  Completed: CheckCircle2,
  'On-Going': HardHat,
  'Not Started': Clock,
  'For Procurement': FileSearch,
  Terminated: XCircle,
};

const CATEGORY_ICONS: Record<string, typeof Building2> = {
  Roads: Route,
  Bridges: Route,
  'Flood Control and Drainage': Droplets,
  'Buildings and Facilities': Building2,
  'Water Provision and Storage': Droplets,
};

function formatCurrency(amount: number): string {
  if (amount >= 1e9) return `₱${(amount / 1e9).toFixed(2)}B`;
  if (amount >= 1e6) return `₱${(amount / 1e6).toFixed(2)}M`;
  if (amount >= 1e3) return `₱${(amount / 1e3).toFixed(1)}K`;
  return `₱${amount.toFixed(2)}`;
}

function getCategoryIcon(category: string) {
  for (const [key, Icon] of Object.entries(CATEGORY_ICONS)) {
    if (category.includes(key)) return Icon;
  }
  return Building2;
}

function getStatusIcon(status: string) {
  return STATUS_ICONS[status] || CheckCircle2;
}

export default function DPWHProjects() {
  const [data, setData] = useState<DPWHData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof DPWHProject>('infraYear');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const perPage = 10;

  // Load data
  useEffect(() => {
    fetch('/data/dpwh-tanay-projects.json')
      .then(r => r.json())
      .then((d: DPWHData) => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Extract unique categories and years
  const categories = useMemo(() => {
    if (!data) return [];
    const cats = new Set(data.projects.map(p => p.category));
    return ['All', ...Array.from(cats).sort()];
  }, [data]);

  const years = useMemo(() => {
    if (!data) return [];
    const yrs = new Set(data.projects.map(p => p.infraYear));
    return ['All', ...Array.from(yrs).sort()];
  }, [data]);

  // Filter and sort
  const filtered = useMemo(() => {
    if (!data) return [];
    let items = [...data.projects];

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        p =>
          p.description.toLowerCase().includes(q) ||
          p.contractId.toLowerCase().includes(q) ||
          p.contractor.toLowerCase().includes(q) ||
          p.location.province.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') {
      items = items.filter(p => p.status === statusFilter);
    }
    if (categoryFilter !== 'All') {
      items = items.filter(p => p.category === categoryFilter);
    }
    if (yearFilter !== 'All') {
      items = items.filter(p => p.infraYear === yearFilter);
    }

    items.sort((a, b) => {
      const aVal = a[sortField] ?? '';
      const bVal = b[sortField] ?? '';
      const cmp =
        typeof aVal === 'number'
          ? aVal - (bVal as number)
          : String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return items;
  }, [
    data,
    search,
    statusFilter,
    categoryFilter,
    yearFilter,
    sortField,
    sortDir,
  ]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleSort(field: keyof DPWHProject) {
    if (sortField === field) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
    setPage(1);
  }

  function SortHeader({
    field,
    children,
  }: {
    field: keyof DPWHProject;
    children: React.ReactNode;
  }) {
    const active = sortField === field;
    return (
      <th
        className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
        onClick={() => toggleSort(field)}
      >
        <div className="flex items-center gap-1">
          {children}
          {active &&
            (sortDir === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            ))}
        </div>
      </th>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        <span className="ml-3 text-gray-500">Loading DPWH projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-700 font-medium">Failed to load DPWH data</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { summary } = data;

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-black text-gray-900">
            DPWH Infrastructure Projects — Tanay, Rizal
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Data sourced from{' '}
          <a
            href="https://transparency.dpwh.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline inline-flex items-center gap-1"
          >
            transparency.dpwh.gov.ph <ExternalLink className="h-3 w-3" />
          </a>
          . Last updated:{' '}
          {new Date(data.fetchedAt).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-black text-gray-900">
              {summary.totalProjects}
            </div>
            <div className="text-xs text-gray-500 mt-1">Total Projects</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="text-2xl font-black text-green-700">
              {summary.completed}
            </div>
            <div className="text-xs text-green-600 mt-1">Completed</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="text-2xl font-black text-blue-700">
              {summary.ongoing}
            </div>
            <div className="text-xs text-blue-600 mt-1">On-Going</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="text-2xl font-black text-purple-700">
              {summary.forProcurement}
            </div>
            <div className="text-xs text-purple-600 mt-1">For Procurement</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <div className="text-2xl font-black text-yellow-700">
              {summary.notStarted}
            </div>
            <div className="text-xs text-yellow-600 mt-1">Not Started</div>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <div className="text-2xl font-black text-indigo-700">
              {formatCurrency(summary.totalBudget)}
            </div>
            <div className="text-xs text-indigo-600 mt-1">Total Budget</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-50 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, contract IDs, contractors..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="On-Going">On-Going</option>
            <option value="For Procurement">For Procurement</option>
            <option value="Not Started">Not Started</option>
            <option value="Terminated">Terminated</option>
          </select>
          <select
            value={categoryFilter}
            onChange={e => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={e => {
              setYearFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
          >
            {years.map(y => (
              <option key={y} value={y}>
                {y === 'All' ? 'All Years' : y}
              </option>
            ))}
          </select>
          <div className="flex items-center text-sm text-gray-500">
            <Filter className="h-4 w-4 mr-1" />
            {filtered.length} of {summary.totalProjects}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortHeader field="contractId">Contract ID</SortHeader>
                <SortHeader field="description">Description</SortHeader>
                <SortHeader field="category">Category</SortHeader>
                <SortHeader field="status">Status</SortHeader>
                <SortHeader field="budget">Budget</SortHeader>
                <SortHeader field="progress">Progress</SortHeader>
                <SortHeader field="infraYear">Year</SortHeader>
                <SortHeader field="contractor">Contractor</SortHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginated.map(project => {
                const StatusIcon = getStatusIcon(project.status);
                const CatIcon = getCategoryIcon(project.category);
                const isExpanded = expandedRow === project.contractId;
                return (
                  <Fragment key={project.contractId}>
                    <tr
                      onClick={() =>
                        setExpandedRow(isExpanded ? null : project.contractId)
                      }
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-3 py-3 text-sm font-mono text-primary-700 font-medium whitespace-nowrap">
                        {project.contractId}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-2">
                          {project.description}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <CatIcon className="h-3.5 w-3.5 text-gray-400" />
                          {project.category}
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            STATUS_COLORS[project.status] ||
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {project.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-700 font-medium whitespace-nowrap">
                        {formatCurrency(project.budget)}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                project.progress === 100
                                  ? 'bg-green-500'
                                  : project.progress > 50
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-500'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {project.infraYear}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 max-w-50">
                        <div
                          className="line-clamp-1"
                          title={project.contractor}
                        >
                          {project.contractor}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50/50">
                        <td colSpan={8} className="px-3 py-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                Description
                              </span>
                              <p className="text-gray-700 mt-1">
                                {project.description || '\u2014'}
                              </p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                Contractor
                              </span>
                              <p className="text-gray-700 mt-1">
                                {project.contractor || '\u2014'}
                              </p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                Program
                              </span>
                              <p className="text-gray-700 mt-1">
                                {project.programName || '\u2014'}
                              </p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                Source of Funds
                              </span>
                              <p className="text-gray-700 mt-1">
                                {project.sourceOfFunds || '\u2014'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-12 text-center text-gray-500"
                  >
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    No projects match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1}–
              {Math.min(page * perPage, filtered.length)} of {filtered.length}{' '}
              projects
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                const p = start + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                      p === page
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-4">
          Data retrieved from the DPWH Transparency Portal API. For the most
          up-to-date information, visit{' '}
          <a
            href="https://transparency.dpwh.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            transparency.dpwh.gov.ph
          </a>
          .
        </p>
      </div>
    </section>
  );
}
